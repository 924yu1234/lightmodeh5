import React from 'react';
import styled from 'styled-components';

import { Type_DAChains } from 'src/da';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useChainInfosMap, useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import Address from '../Address';
import Hash from '../Hash';
import BottomModal from '../Modals/bottomModal';

export default function BrowserDetail() {
  const intl = useIntl();
  const { visible, hide, data } = useModals(ModalKeys.browserDetail);
  const { to_address, from_address, tx_fee, chain, type, tx_hash } = data || {};
  const isApprove = type === 'Approve';
  const chainInfosMap = useChainInfosMap();

  return (
    <BottomModal onClose={hide} opened={visible}>
      <StyledWithdrawDetail className="modal-wrapper">
        <div className="modal-title">
          {intl.transaction_details}
          <Close onClick={hide} />
        </div>
        <div className="modal-content">
          <div className="item">
            <div className="label">{intl.From}</div>
            <div className="value ">
              <Address address={from_address} chainId={chain} />
            </div>
          </div>

          <div className="item">
            <div className="label">{intl.interact_with}</div>
            <div className="value ">
              <Address address={to_address} chainId={chain} />
            </div>
          </div>
          <div className="item">
            <div className="label">{intl['account.th_time']}</div>
            <div className="value">{data?.create_time_display}</div>
          </div>

          <div className="item">
            <div className="label">{intl.filter_type}</div>
            <div className="value">
              {isApprove
                ? `${intl['account.approve']}`
                : intl.smart_contract_interaction}
            </div>
          </div>

          <div className="item">
            <div className="label">{intl.Network}</div>
            <div className="value">
              {chainInfosMap[chain as Type_DAChains]?.name}
            </div>
          </div>
          <div className="item">
            <div className="label">{intl.network_fee}</div>
            <div className="value">{tx_fee}</div>
          </div>
          <div className="item">
            <div className="label">{intl['account.th_tx_hash']}</div>
            <div className="value">
              <Hash txHash={tx_hash} chainId={chain} />
            </div>
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
  .amount {
    margin: 10px 0 20px;
    color: ${(props) => props.theme.t_fff};
    font-size: 20px;
    line-height: 20px;
  }
  .tx_status {
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
