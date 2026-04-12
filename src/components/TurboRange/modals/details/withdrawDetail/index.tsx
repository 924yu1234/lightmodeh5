import React, { useEffect } from 'react';
import { usePrevious } from 'ahooks';
import styled from 'styled-components';

import GALinkWrapper from 'src/components/GA/LinkWrapper';
import FeeRefunded from 'src/components/Gas/feeRefunded';
import GasDetailsInDetail from 'src/components/Gas/gasDetailsInDetail';
import BottomModal from 'src/components/Modals/bottomModal';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useTurboRangeOrderProgress } from 'src/state/turboRange/useTurboRangeOrderProgress';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import ProductName from '../../../productName';
import TurboRangeOrderStatusEle from '../../../status';
import useRedirectAndOpenPosition from '../useRedirectAndOpenPosition';
import Withdrawed from './withdrawed';

export default function TurboRangeWithdrawDetailModal() {
  const { visible, hide, order } = useModals(
    ModalKeys.turboRangeWithdrawDetail
  );

  const dexAccount = useDexAccount();
  const preAccount = usePrevious(dexAccount?.account);

  const intl = useIntl();
  const data = useTurboRangeOrderProgress({
    order: { ...order, type: 'withdraw' },
    intent_id: order?.intent_id,
  });

  useEffect(() => {
    if (preAccount && preAccount !== dexAccount?.account) {
      hide();
    }
  }, [preAccount, dexAccount?.account, hide]);
  const redirectAndOpenPosition = useRedirectAndOpenPosition({
    order,
  });

  return (
    <BottomModal
      onClose={hide}
      opened={visible}
      className="full-modal"
      zIndex={201}
    >
      <StyledDetail className="modal-wrapper">
        <div className="modal-title">
          {intl.Withdraw}
          <Close onClick={hide} />
        </div>
        {data && (
          <div className="modal-content hideScrollBar">
            <TurboRangeOrderStatusEle status={data.status} />
            <div className="line"></div>
            <Withdrawed data={data} />
            <FeeRefunded refunded_fee={data?.refunded_fee} showTips />
            <GasDetailsInDetail
              gas_data={data?.gas_data}
              net_fee_estimated={data?.net_fee_estimated}
              net_fee_used={data?.net_fee_used}
            />
            <div className="item">
              <div className="item-title">{intl.Product}</div>
              <div className="item-desc">
                <ProductName poolAddress={data.pool_address || ''} />
              </div>
            </div>

            <div className="item">
              <div className="item-title">{intl.time}</div>
              <div className="item-desc">{data.create_time_display}</div>
            </div>

            <div className="view-btn-wrapper">
              <GALinkWrapper
                className="dg-primary view-btn"
                onClick={() => {
                  hide();
                  redirectAndOpenPosition();
                }}
                eventName="btn_turbo_range_invest_detail_view"
              >
                {intl.turboRange.view_in_turbo_range}
              </GALinkWrapper>
            </div>
          </div>
        )}
      </StyledDetail>
    </BottomModal>
  );
}

const StyledDetail = styled.div`
  width: 100%;
  ${(props) => props.theme.fontRegular};
  .modal-content {
    padding: 2px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-height: ${(props) => {
      return props.theme.windowHeight - props.theme.modalTop * 2 - 150;
    }}px;
    overflow: auto;
  }

  .data-token {
    ${(props) => props.theme.fontRegular};
    font-size: 16px;
    color: ${(props) => props.theme.t_f4f};
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 10px;
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.innerBorder};
    margin: 15px 0 15px;
  }

  .fee-refunded {
    margin-bottom: 10px;
  }

  .tokens {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.border_white_10};
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .token-item {
      display: flex;
      align-items: center;
      gap: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 14px;
      line-height: 18px;
    }
  }

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
    line-height: 18px;

    .item-title {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b_80};
      margin-right: auto;
    }
    .item-desc {
      ${(props) => props.theme.fontMedium};
      font-size: 14px;
      color: ${(props) => props.theme.t_fff};
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .gas-detail-v2 {
    margin-bottom: 15px;
  }

  .view-btn-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 30px;
    justify-content: center;
  }

  .view-btn {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 30px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
