import React from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useChainInfosMap, useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import Address from '../Address';
import Hash from '../Hash';
import TokenIcon from '../Token/icon';

export default function ReceiveDetail() {
  const intl = useIntl();
  const { visible, hide, data } = useModals(ModalKeys.receiveDetail);

  const chainInfoMap = useChainInfosMap();

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledTransferDetail>
        <div className="modal-title">
          {intl.Receive}
          <Close onClick={hide} />
        </div>
        <TokenIcon size={32} token={data?.token} />
        <div className="amount">
          {data?.amount_display} {data?.token.symbol}
        </div>
        <div className="item">
          <div className="label">{intl.From}</div>
          <div className="value">
            <Address address={data?.from_address} chainId={data?.chain} />
          </div>
        </div>
        <div className="item">
          <div className="label">{intl.To}</div>
          <div className="value">
            <Address address={data?.to_address} chainId={data?.chain} />
          </div>
        </div>
        <div className="item">
          <div className="label">{intl.Network}</div>
          <div className="value">
            {chainInfoMap[data.chain]?.name || data?.chain}
          </div>
        </div>
        {!!data?.tx_hash && (
          <div className="item">
            <div className="label">{intl['account.th_tx_hash']}</div>
            <div className="value">
              <Hash txHash={data?.tx_hash} chainId={data?.chain} />
            </div>
          </div>
        )}

        <div className="item">
          <div className="label">{intl['account.th_time']}</div>
          <div className="value">{data?.create_time_display}</div>
        </div>
      </StyledTransferDetail>
    </Modal>
  );
}

const StyledTransferDetail = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${(props) => props.theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }
  .amount {
    margin: 10px 0 30px;
    color: ${(props) => props.theme.t_fff};
    font-size: 20px;
    line-height: 20px;
  }
  .tx_status {
    margin-bottom: 40px;
  }
  .item {
    display: flex;
    width: 100%;
    margin-bottom: 6px;
    .label {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b_60};
      line-height: 24px;
      margin-right: auto;
    }
    .value {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_f4f};
      line-height: 24px;
      display: flex;
      align-items: center;
      word-break: break-word;
      text-align: end;
      .icon-open-browser {
        margin-left: 5px;
      }
    }
  }
`;
