import React from 'react';
import styled from 'styled-components';

import useWithdrawDataRefresh from 'src/hooks/useWithdrawDataRefresh';

import Close from 'js/components/Icons/close';
import WithdrawTxStatus from 'js/components/SendTxStatus';
import TipsGas from 'js/components/Tips/tips_gas';
import { useIntl } from 'js/locals';
import {
  useChainInfosMap,
  useModals,
  useShowModal,
} from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import GasDetailsInDetail from '../Gas/gasDetailsInDetail';
import Hash from '../Hash';
import BottomModal from '../Modals/bottomModal';
import Recipient from '../SendTxStatus/Recipient';
import TokenIcon from '../Token/icon';
import UsdcSuppliedChartEntry from '../UsdcSupplied/chartEntry';

export default function SendDetail() {
  const intl = useIntl();
  const { visible, hide, data: item } = useModals(ModalKeys.sendDetail);
  const data = useWithdrawDataRefresh({ item });
  const chainInfosMap = useChainInfosMap();
  const showModal = useShowModal();

  return (
    <BottomModal onClose={hide} opened={visible}>
      <StyledWithdrawDetail className="modal-wrapper">
        <div className="modal-title">
          {intl.Send}
          <Close onClick={hide} />
        </div>

        <div className="modal-content">
          <TokenIcon size={32} token={data?.token} />
          <div className="amount">
            {data?.amount_display} {data?.token?.symbol}
          </div>
          <UsdcSuppliedChartEntry
            token={data.token}
            tokens={data.usdc_tokens}
            chain={data.chain}
            recipent={data.to_address}
            amount={data.amount_display}
            onBack={() => {
              showModal({
                modal: ModalKeys.sendDetail,
                data,
              });
            }}
          />
          <WithdrawTxStatus data={data} />
          <div className="item">
            <div className="label">{intl.Network}</div>
            <div className="value ">
              {chainInfosMap[item?.chain]?.name || '--'}
            </div>
          </div>
          <div className="item">
            <div className="label">{intl.Recipient}</div>
            <div className="value">
              <Recipient data={data} />
            </div>
          </div>

          {!!data?.tx_hash && (
            <div className="item">
              <div className="label">{intl['account.th_tx_hash']}</div>
              <div className="value">
                <Hash txHash={data?.tx_hash} chainId={item?.chain} />
              </div>
            </div>
          )}
          <GasDetailsInDetail
            gas_data={data?.gas_data}
            net_fee_estimated={data?.net_fee_estimated}
            net_fee_used={data?.net_fee_used}
          >
            <div className="item">
              <div className="label">
                <TipsGas>{intl.gas_fee}</TipsGas>
              </div>
              <div className="value">
                {data.fee_amount_display ?? '--'} {data?.fee_token?.symbol}
              </div>
            </div>
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

  .amount {
    margin: 10px 0 0;
    color: ${(props) => props.theme.t_fff};
    font-size: 20px;
    line-height: 20px;
  }

  .modal-content {
    display: flex;
    padding: 0 20px;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: ${(props) => {
      return props.theme.windowHeight - props.theme.modalTop * 2 - 100;
    }}px;
    overflow: auto;
  }

  .tx_status {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .usdc-supplied {
    margin-top: 10px;
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
