import React, { useEffect, useRef, useState } from 'react';
import { usePrevious } from 'ahooks';
import styled from 'styled-components';

import { useDexAccount } from 'src/state/dexAccount/hooks';
import { SwapOrder } from 'src/state/swap/orders/convertSwapOrder';
import {
  useGetSwapOrderError,
  useSwapOrder,
  useUpdateSwapOrder,
} from 'src/state/swap/orders/hooks';
import { useGetSwapOrder } from 'src/state/swap/orders/service';
import { useSwapDataMap } from 'src/state/swap/orders/utils';

import Close from 'js/components/Icons/close';
import { SwapOrderStatus } from 'js/constants/consts';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import GasDetailsInDetail from '../Gas/gasDetailsInDetail';
import Hash from '../Hash';
import BottomModal from '../Modals/bottomModal';
import Spin from '../Spin';
import UsdcSuppliedInTable from '../UsdcSupplied/inTable';

export default function SwapOrderDetail() {
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const { visible, hide, orderId, listData } = useModals(
    ModalKeys.swapOrderDetail
  );
  const _data = useSwapOrder({ orderId }) || listData;

  const [data, setData] = useState(_data || {});
  const dexAccount = useDexAccount();
  const preAccount = usePrevious(dexAccount?.account);
  const getSwapOrderError = useGetSwapOrderError();

  const intl = useIntl();
  const { orderDirMap, statusMap } = useSwapDataMap();
  const updateSwapOrder = useUpdateSwapOrder();

  const fetchOrderDetail = useGetSwapOrder();
  useEffect(() => {
    setLoading(true);
    setData(_data || listData || {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (preAccount && preAccount !== dexAccount?.account) {
      hide();
    }
  }, [preAccount, dexAccount?.account, hide]);

  useEffect(() => {
    fetchOrderDetail({ orderId })
      .then((resp: any) => {
        setData(resp);
        // 如果还没入库则1秒后重试
        if (!resp.status) {
          timer.current = setTimeout(() => {
            setIndex(index + 1);
          }, 1000);
          return;
        }
        setLoading(false);
        if (
          resp.status === SwapOrderStatus.success ||
          resp.status === SwapOrderStatus.failed
        ) {
          // 如果订单状态是成功或失败，则更新订单状态，防止ws推送的完成状态被api数据更新
          updateSwapOrder(resp);
          return;
        }
        timer.current = setTimeout(() => {
          setIndex(index + 1);
        }, 5000);
      })
      .catch(() => {
        setLoading(false);
      });
    return () => {
      if (timer?.current) {
        clearTimeout(timer.current);
      }
    };
  }, [
    preAccount,
    dexAccount?.account,
    hide,
    index,
    fetchOrderDetail,
    listData?.status,
    orderId,
    updateSwapOrder,
  ]);

  const { market, status } = data || {};

  const failReason = getSwapOrderError({
    errorCode: data?.errorCode,
  } as SwapOrder);

  return (
    <BottomModal onClose={hide} opened={visible}>
      <StyledTradeOrderDetail className="modal-wrapper">
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <Spin spinning={loading}>
          <div className="modal-content hideScrollBar">
            <div className="market">{market}</div>

            {failReason ? (
              <div className="fail-reason">
                {intl.order_failed}
                {intl.colon} {failReason}
              </div>
            ) : (
              <div className="order-status">
                <div className={`status status_${status}`}>
                  {statusMap[status]}
                </div>
              </div>
            )}

            <div className={`item dir dir_${data?.orderDir}`}>
              <div className="label">{intl['orders.detail_type']}</div>
              <div className="value">
                {intl.Swap}/{(orderDirMap as any)[data?.orderDir]}
              </div>
            </div>

            <div className="item">
              <div className="label">{intl.pay}</div>
              <div className="value">
                <UsdcSuppliedInTable tokens={data?.usdc_tokens}>
                  {data?.pay_display} {data?.pay_token?.symbol}
                </UsdcSuppliedInTable>
              </div>
            </div>
            <div className="item">
              <div className="label">{intl.receive}</div>
              {status !== SwapOrderStatus.success ? (
                <div className="value">
                  {data.buy_display} {data.receive_token?.symbol}
                </div>
              ) : (
                <div className="value">
                  {data.receive_display} {data.receive_token?.symbol}
                </div>
              )}
            </div>
            <div className="item">
              <div className="label">{intl.price}</div>
              <div className="value">{data.price_display}</div>
            </div>
            <GasDetailsInDetail
              gas_data={data?.gas_data}
              net_fee_estimated={data?.net_fee_estimated}
              net_fee_used={data?.net_fee_used}
            >
              <div></div>
            </GasDetailsInDetail>
            {data.tx_hash && (
              <div className="item hash">
                <div className="label">{intl['account.th_tx_hash']}</div>
                <div className="value text-underline">
                  <Hash txHash={data.tx_hash} chainId={data.chain} />
                </div>
              </div>
            )}
          </div>
        </Spin>
      </StyledTradeOrderDetail>
    </BottomModal>
  );
}

const StyledTradeOrderDetail = styled.div`
  width: 100%;
  ${(props) => props.theme.fontRegular};
  .modal-content {
    padding: 2px 20px;
    width: 100%;
    max-height: ${(props) => {
      return props.theme.windowHeight - props.theme.modalTop * 2 - 100;
    }}px;
    overflow: auto;
  }

  .market {
    ${(props) => props.theme.fontMedium};
    font-size: 16px;
    color: ${({ theme }) => theme.t_fff};
    text-align: center;
    line-height: 22px;
    margin-bottom: 10px;
  }
  .order-status {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.t_b7b};
    margin-bottom: 40px;
    font-size: 12px;
    color: ${(props) => props.theme.t_c4c4c4};
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    .more-actions-select-label {
      background: ${({ theme }) => theme.bg_white_10};
      border-radius: 2px;
    }
    .status {
      height: 26px;
      min-width: 60px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${({ theme }) => theme.bg_white_10};
      border-radius: 2px;
    }
  }

  .fail-reason {
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${(props) => props.theme.t_fff_80};
    line-height: 20px;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 20px;
  }

  .partially_filled_tips {
    ${({ theme }) => theme.fontRegular};
    color: ${({ theme }) => theme.modalText};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    min-height: 20px;
    .label {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b};
      line-height: 20px;
      margin-right: auto;
    }
    .value {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_d4d};
      line-height: 14px;
      display: flex;
      align-items: center;
      gap: 4px;
      &.free {
        color: ${(props) => props.theme.green};
      }
      .value-base {
        white-space: nowrap;
        color: ${(props) => props.theme.t_b7b};
      }
      .pre-amount {
        display: inline-block;
        align-items: center;
        .dg-tooltip {
          display: inline-block;
        }
      }
      &.amount {
        display: block;
        text-align: right;
      }
    }
    &.dir {
      &.dir_BUY .value {
        color: ${(props) => props.theme.green} !important;
      }
      &.dir_SELL .value {
        color: ${(props) => props.theme.red} !important;
      }
    }
    &.hash {
      .value {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
