import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDocumentVisibility } from '@mantine/hooks';

import { SWAP_NO_ROUTE_FUND } from 'src/constants/apiErr';
import { NEW_AMOUNT_DECIMAL, SWAP_AMOUNT_DECIMAL } from 'src/constants/dex';
import { OrderDirs, Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { formatUnits } from 'src/ethers/utils';
import { useIntl } from 'src/locals';
import { useGaEvent } from 'src/providers/useWallet';
import { logIntentTryCreate } from 'src/utils/log';
import message from 'src/utils/message';
import {
  divide,
  isNumber,
  maxEffectiveNumber,
  multiply,
} from 'src/utils/numberUtils';

import { useCheckDAs } from '../dexAccount/opr/useCheckDAs';
import { useRefreshSwapBalance } from '../swap/balances/hooks';
import { estimateIntentSwap } from './intentService';

export interface EstimateParams {
  key: string;
  chain: string;
  sellTokenCode: string;
  buyTokenCode: string;
  sellAmount: string;
  sellVolume: string;
  maxSlippage: string;
  account: string;
  sellAddress: string;
  buyAddress: string;
  takerFee: string;
  buyTokenDecimals: number;
  gasToken?: Token;
  isMaxModel?: boolean;
}

export interface EstimateContext {
  result: { [key: string]: any };
  estimate: (params: EstimateParams) => Promise<any>;
}

const SetContext = React.createContext<EstimateContext>({} as EstimateContext);

export default function EstimateProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [result, setResult] = useState<{ [key: string]: any }>({});
  const intl = useIntl();
  const disabledEstimateKey = useRef<string>('');
  const documentState = useDocumentVisibility();

  const needEstimate = useMemo(() => {
    return documentState === 'visible';
  }, [documentState]);
  const gaEvent = useGaEvent();
  const preLogKey = useRef<string>('');
  const checkDAs = useCheckDAs();
  const refreshSwapBalance = useRefreshSwapBalance();
  const doEstimate = useCallback(
    (params: any) => {
      if (!isNumber(params.sellVolume) || Number(params.sellVolume) <= 0)
        return Promise.resolve({
          error: 'no sell volume',
          data: undefined,
        });

      if (!params?.sellToken?.code || !params?.buyToken?.code)
        return Promise.resolve({
          error: 'token error',
          data: undefined,
        });

      if (!checkDAs(params?.buyToken?.chain as Type_DAChains))
        return Promise.reject({});
      if (!checkDAs(params?.gasToken?.chain as Type_DAChains))
        return Promise.reject({});
      if (!checkDAs(params?.sellToken?.chain as Type_DAChains))
        return Promise.reject({});

      // solana 使用swap/trade 的estimate
      if (!needEstimate)
        return Promise.resolve({ error: 'no need estimate', data: undefined });
      const key = params.key;

      if (params.sellToken?.code === params.buyToken?.code) {
        setResult((pre) => {
          return {
            ...pre,
            [key]: undefined,
          };
        });
        return Promise.resolve({
          error: 'token error',
          data: undefined,
        });
      }

      if (disabledEstimateKey.current === key) {
        return Promise.resolve({
          error: 'disabledEstimate limit',
          data: undefined,
        });
      }
      disabledEstimateKey.current = '';

      if (preLogKey.current !== key) {
        preLogKey.current = key;
        gaEvent('estimate_intent_swap', {
          buyToken: params?.buyToken?.code,
          sellToken: params?.sellToken?.code,
          sellAmount: params?.sellAmount,
          orderDir: params?.orderDir,
          chain: params?.chain,
          da_owner: params?.da_owner,
          gasToken: params?.gasToken?.code,
        });
      }

      return estimateIntentSwap(params)
        .then((_resp: any) => {
          const tryRespNoResult = !_resp?.result;
          const tryRespIsBalanceEnough = !!_resp?.is_balance_enough;
          if (tryRespNoResult || !tryRespIsBalanceEnough) {
            refreshSwapBalance({
              refreshIndex: Math.floor(Date.now() / 30000),
            });
            logIntentTryCreate({
              order: params,
              tryResp: _resp,
              hasResult: !!_resp.result,
              isBalanceEnough: _resp.is_balance_enough,
            });
          }
          const { action } = _resp;
          const { token_in } = action;
          const orderDir = params.orderDir;
          let minimumReceiveAmount = formatUnits(
            token_in[0]?.min_amount,
            params.buyTokenDecimals
          );

          let receiveAmount = maxEffectiveNumber(
            divide(
              minimumReceiveAmount,
              1 - Number(params.maxSlippage)
            ) as string,
            SWAP_AMOUNT_DECIMAL,
            {
              maxDecimals: params.buyTokenDecimals,
              floor: true,
            }
          );

          if (isNumber(token_in[0]?.amount)) {
            receiveAmount = maxEffectiveNumber(
              formatUnits(token_in[0]?.amount, params.buyTokenDecimals),
              SWAP_AMOUNT_DECIMAL,
              {
                maxDecimals: params.buyTokenDecimals,
                floor: true,
              }
            );
            minimumReceiveAmount = maxEffectiveNumber(
              multiply(receiveAmount, 1 - Number(params.maxSlippage)),
              SWAP_AMOUNT_DECIMAL,
              {
                maxDecimals: params.buyTokenDecimals,
                floor: true,
              }
            );
          }

          let price = '';

          if (orderDir === OrderDirs.SELL) {
            price = maxEffectiveNumber(
              divide(receiveAmount, params.sellAmount),
              NEW_AMOUNT_DECIMAL
            );
          } else {
            price = maxEffectiveNumber(
              divide(params.sellAmount, receiveAmount),
              NEW_AMOUNT_DECIMAL
            );
          }

          const result = {
            ..._resp,
            key,
            price,
            receiveAmount,
            minimumReceive: minimumReceiveAmount,
            estimateTime: Date.now(),
          };

          setResult((pre) => {
            return {
              ...pre,
              [key]: result,
            };
          });
          return Promise.resolve(result);
        })
        .catch((err: any) => {
          const errorResult = {
            receiveAmount: '0',
            price: '0',
            minimumReceive: '0',
            estimateTime: Date.now(),
            estimateArrivalTime: 0,
          };
          if (err?.message.includes('Too Many Requests')) {
            disabledEstimateKey.current = key;
            message.error(intl.rate_limit_tips);
            setResult((pre) => {
              return {
                ...pre,
                [key]: errorResult,
              };
            });
          }
          if (
            err?.message.includes(
              'The Open API service is currently unavailable'
            )
          ) {
            disabledEstimateKey.current = key;
            message.error(intl.service_unavailable);
            setResult((pre) => {
              return {
                ...pre,
                [key]: errorResult,
              };
            });
          }

          if (err?.code === SWAP_NO_ROUTE_FUND) {
            disabledEstimateKey.current = key;
            message.error(intl.no_route_fund);
            setResult((pre) => {
              return {
                ...pre,
                [key]: errorResult,
              };
            });
          }
          if (err?.code === -404) {
            disabledEstimateKey.current = key;
            message.error(intl.insufficient_pool_liquidity);
            setResult((pre) => {
              return {
                ...pre,
                [key]: errorResult,
              };
            });
          }
          return Promise.resolve({
            error: 'estimate error',
            err,
            data: errorResult,
          });
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [intl, needEstimate, checkDAs]
  );

  const value = useMemo(() => {
    return {
      result,
      estimate: doEstimate,
    };
  }, [result, doEstimate]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useSwapEstimate() {
  return useContext(SetContext);
}
