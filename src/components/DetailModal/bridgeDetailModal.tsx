import React from 'react';
import styled from 'styled-components';

import { Type_DAChains } from 'src/da';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useChainInfosMap, useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import { useBridgeUsdcOrderProgress } from '../BridgeUsdc/useBridgeUsdcOrderProgress';
import GasDetailsInDetail from '../Gas/gasDetailsInDetail';
import BottomModal from '../Modals/bottomModal';
import TokenIcon from '../Token/icon';
import Status from './status';

export default function BridgeDetail() {
  const intl = useIntl();
  const { visible, hide, data: item } = useModals(ModalKeys.bridgeDetail);
  const { from_chain, to_chain } = item || {};
  const chainInfoMap = useChainInfosMap();
  const data = useBridgeUsdcOrderProgress({
    order: item,
    intent_id: item?.intent_id,
  });

  return (
    <BottomModal onClose={hide} opened={visible}>
      <StyledWithdrawDetail className="modal-wrapper">
        <div className="modal-title">
          {intl.Bridge}
          <Close onClick={hide} />
        </div>
        <div className="modal-content">
          <TokenIcon token={data?.token} hideChainIcon size={32} />
          <div className="token-symbol">
            {data?.amount} {data?.token?.symbol}
          </div>
          <Status status={data?.status} />

          <div className="item">
            <div className="label">{intl.From}</div>
            <div className="value ">
              {chainInfoMap[from_chain as Type_DAChains]?.name}
            </div>
          </div>

          <div className="item">
            <div className="label">{intl.To}</div>
            <div className="value ">
              {chainInfoMap[to_chain as Type_DAChains]?.name}
            </div>
          </div>
          <GasDetailsInDetail
            gas_data={data?.gas_data}
            net_fee_estimated={data?.net_fee_estimated}
            net_fee_used={data?.net_fee_used}
          >
            <div></div>
          </GasDetailsInDetail>
          <div className="item">
            <div className="label">{intl['account.th_time']}</div>
            <div className="value">{data?.create_time_display}</div>
          </div>
        </div>
      </StyledWithdrawDetail>
    </BottomModal>
  );
}

const StyledWithdrawDetail = styled.div`
  width: 100%;
  ${(props) => props.theme.fontRegular};
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .token-symbol {
    margin: 10px 0 20px;
    color: ${(props) => props.theme.t_fff};
    font-size: 20px;
    line-height: 20px;
  }
  .status {
    margin-bottom: 40px;
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
      color: ${(props) => props.theme.t_b7b_80};
      line-height: 18px;
      margin-right: auto;
    }
    .value {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_fff};
      line-height: 18px;
      display: flex;
      align-items: center;
      word-break: break-word;
      text-align: end;
      &.tx_hash {
        color: ${(props) => props.theme.blue};
      }
      .icon-open-browser {
        margin-left: 5px;
      }
      .dg-link-wrapper {
        padding: 0;
        &:hover {
          background: none;
        }
      }
    }
  }
`;
