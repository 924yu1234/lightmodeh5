import React, { useEffect } from 'react';
import { usePrevious } from 'ahooks';
import styled from 'styled-components';

import GasDetailsInDetail from 'src/components/Gas/gasDetailsInDetail';
import BottomModal from 'src/components/Modals/bottomModal';
import TokenIcon from 'src/components/Token/icon';
import { useDexAccount } from 'src/state/dexAccount/hooks';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import Status from '../status';
import { useEarnOrderProgress } from './progress/useEarnOrderProgress';

export default function ClaimOrderDetailModal() {
  const { visible, hide, order } = useModals(ModalKeys.earnClaimDetail);

  const dexAccount = useDexAccount();
  const preAccount = usePrevious(dexAccount?.account);

  const intl = useIntl();
  const data = useEarnOrderProgress({
    order: { ...order, type: 'claim' },
    intent_id: order?.intent_id,
  });

  useEffect(() => {
    if (preAccount && preAccount !== dexAccount?.account) {
      hide();
    }
  }, [preAccount, dexAccount?.account, hide]);

  return (
    <BottomModal onClose={hide} opened={visible}>
      <StyledDetail className="modal-wrapper">
        <div className="modal-title">
          {intl.Claim}
          <Close onClick={hide} />
        </div>
        <div className="modal-content hideScrollBar">
          {(data.tokens || []).map((token: any) => {
            return (
              <div className="data-token">
                <TokenIcon token={token} />
                {token.amount_display} {token?.symbol}
              </div>
            );
          })}
          <Status status={data.status} />
          <div className="item">
            <div className="item-title">{intl.Protocol}</div>
            <div className="item-desc">
              {data.protocol} | {data.vault_name}
            </div>
          </div>
          <GasDetailsInDetail
            gas_data={data?.gas_data}
            net_fee_estimated={data?.net_fee_estimated}
            net_fee_used={data?.net_fee_used}
          />
          <div className="item">
            <div className="item-title">{intl.time}</div>
            <div className="item-desc">{data.create_time_display}</div>
          </div>
        </div>
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
    align-items: center;
    width: 100%;
    max-height: ${(props) => {
      return props.theme.windowHeight - props.theme.modalTop * 2 - 100;
    }}px;
    overflow: auto;
  }
  .amount {
    margin: 10px 0 20px;
    ${(props) => props.theme.fontRegular};
    font-size: 20px;
    line-height: 24px;
    color: ${(props) => props.theme.t_fff};
  }

  .earn-status {
    margin-bottom: 40px;
    margin-top: 10px;
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

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    .item-title {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b_80};
      line-height: 24px;
      margin-right: auto;
    }
    .item-desc {
      ${(props) => props.theme.fontMedium};
      font-size: 14px;
      color: ${(props) => props.theme.t_fff};
      line-height: 24px;
      display: flex;
      align-items: center;
      .icon-info {
        margin-right: 4px;
      }
      &.free {
        color: ${(props) => props.theme.green};
      }
    }
  }
`;
