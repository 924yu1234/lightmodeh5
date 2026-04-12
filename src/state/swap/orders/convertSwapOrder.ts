import dayjs from 'dayjs';

import { SwapOrderStatus } from 'src/constants/consts';
import {
  SWAP_AMOUNT_DECIMAL,
  SWAP_PRICE_DECIMAL,
  SWAP_SELL_AMOUNT_DECIMAL,
} from 'src/constants/dex';
import { OrderDirs } from 'src/constants/interface';
import { formatUnits } from 'src/ethers/utils';
import digit from 'src/utils/digit';
import {
  divide,
  isNumber,
  maxEffectiveNumber,
  minus,
  multiply,
  plus,
} from 'src/utils/numberUtils';

export type SwapOrder = ReturnType<typeof doConvertSwapOrder>;

const doConvertSwapOrder = ({ data }: any) => {
  const {
    error_code,
    base_token,
    quote_token,
    pay_token,
    status,
    order_side,
    create_time,
    sell_volume,
    buy_volume,
    filled_buy_token_volume,
    pair_id,
    order_id,
    localOrderId,
    intent_id,
    gas_data,
  } = data;

  const baseToken = {
    ...base_token,
    id: isNumber(base_token?.token_id) ? base_token?.token_id : base_token?.id,
  };
  const payToken = {
    ...pay_token,
    id: isNumber(pay_token?.token_id) ? pay_token?.token_id : pay_token?.id,
  };

  const quoteToken = {
    ...quote_token,
    id: isNumber(quote_token?.token_id)
      ? quote_token?.token_id
      : quote_token?.id,
  };

  const buyToken = order_side === OrderDirs.BUY ? baseToken : quoteToken;
  const sellToken = order_side === OrderDirs.BUY ? quoteToken : baseToken;

  let pay = '';
  let pay_display = '--';
  let pay_display_max7 = '--';

  if (isNumber(payToken?.volume) && Number(payToken?.volume) > 0) {
    pay = formatUnits(payToken?.volume, payToken?.decimals);
  } else if (isNumber(sell_volume) && Number(sell_volume) > 0) {
    pay = formatUnits(sell_volume, sellToken?.decimals);
  }
  pay_display = `${maxEffectiveNumber(pay, SWAP_SELL_AMOUNT_DECIMAL)}`;
  pay_display_max7 = `${maxEffectiveNumber(pay, 7)}`;

  let buy = '0';
  let buy_display = '--';
  // 下单时price
  const orderPrice = data.price;
  const sellAmount = sell_volume
    ? formatUnits(sell_volume, sellToken?.decimals)
    : '';
  if (
    isNumber(orderPrice) &&
    Number(sellAmount) > 0 &&
    Number(orderPrice) > 0
  ) {
    if (order_side === OrderDirs.BUY) {
      buy = divide(sellAmount, orderPrice) as string;
    } else {
      buy = multiply(sellAmount, orderPrice) as string;
    }
    buy_display = `${maxEffectiveNumber(buy, SWAP_AMOUNT_DECIMAL, {
      maxDecimals: order_side === OrderDirs.BUY ? buyToken?.decimals : 6, // USDC
    })}`;
  } else if (isNumber(buy_volume) && Number(buy_volume) > 0) {
    buy = formatUnits(buy_volume, buyToken?.decimals);
    buy_display = `${maxEffectiveNumber(buy, SWAP_AMOUNT_DECIMAL)}`;
  }

  let receive = '';
  let receive_display = '--';
  let receive_display_max7 = '--';
  if (
    isNumber(filled_buy_token_volume) &&
    Number(filled_buy_token_volume) > 0
  ) {
    receive = formatUnits(filled_buy_token_volume, buyToken?.decimals);
    receive_display_max7 = `${maxEffectiveNumber(receive, 7)}`;
    receive_display = `${maxEffectiveNumber(
      receive,
      SWAP_SELL_AMOUNT_DECIMAL
    )}`;
  }

  let price;
  let price_display = '--';

  if (
    status === SwapOrderStatus.success ||
    status === SwapOrderStatus.quickSuccess
  ) {
    price =
      order_side === OrderDirs.BUY
        ? divide(pay, receive, { toNumber: true })
        : divide(receive, pay, { toNumber: true });
    price_display = maxEffectiveNumber(price, SWAP_PRICE_DECIMAL);
  }

  let statusKey = status;
  if (
    status === SwapOrderStatus.quickSuccess ||
    status === SwapOrderStatus.success
  ) {
    statusKey = 'success';
  }

  return {
    usdc_tokens: convertUsdcTokens(data, data.pay_token),
    statusKey,
    localOrderId,
    net_fee_estimated: data?.net_fee_estimated,
    net_fee_used: data?.net_fee_used,
    chain: data.chain_name,
    tx_hash: data.tx_hash,
    errorCode: error_code,
    id: localOrderId || order_id,
    order_id,
    intent_id,
    baseToken,
    quoteToken,
    payToken,
    pairId: pair_id,
    market: `${baseToken.symbol}`,
    price,
    price_display,
    status,
    orderDir: order_side,
    create_time_display: dayjs(create_time * 1000).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    create_time_display_m: dayjs(create_time * 1000).format('YYYY-MM-DD HH:mm'),
    create_time_display_mini: formatOrderTime(create_time * 1000),
    receive,
    receive_display,
    receive_display_max7,
    receive_token: buyToken,
    pay,
    pay_display,
    pay_display_max7,
    pay_token,
    buy,
    buy_display,
    create_time_day: dayjs(create_time * 1000).format('YYYY-MM-DD'),
    gas_data,
  };
};

// 时间字段采用缩略表示
// 当天的订单：hh:mm:ss
// 昨天及更早的，并在同一年的订单：MM-DD hh:mm
// 去年及更早的订单：YYYY-MM-DD

export function formatOrderTime(time: number) {
  const now = dayjs();
  const order = dayjs(time);
  if (now.isSame(order, 'day')) {
    return order.format('HH:mm:ss');
  }
  if (now.isSame(order, 'year')) {
    return order.format('MM-DD HH:mm');
  }
  return order.format('YYYY-MM-DD');
}

export default doConvertSwapOrder;

export function convertUsdcTokens(data: any, payToken: any) {
  const { usdc_tokens } = data;
  if (usdc_tokens && usdc_tokens?.length > 0) {
    const convertedUsdcTokens = usdc_tokens.map((d: any) => {
      const amount = isNumber(d.volume)
        ? formatUnits(d?.volume, d.decimals)
        : '--';
      return {
        ...d,
        amount,
        amount_display: digit.formatInGroupSeparator(amount) || '--',
      };
    });

    const sum = convertedUsdcTokens.reduce((acc: string, curr: any) => {
      return plus(acc, curr.amount);
    }, '0');

    const totalAmount = isNumber(payToken?.volume)
      ? formatUnits(payToken?.volume, payToken?.decimals)
      : '--';

    const left = minus(totalAmount, sum);

    if (Number(left) > 0) {
      return [
        ...convertedUsdcTokens,
        {
          ...payToken,
          amount: left,
          amount_display: digit.formatInGroupSeparator(left) || '--',
        },
      ];
    }
    return convertedUsdcTokens;
  }
  return [];
}
