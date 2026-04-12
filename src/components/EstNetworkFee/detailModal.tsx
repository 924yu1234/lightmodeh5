import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import { Token } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatNetworFeeValue } from 'src/utils/format';
import { logNetworkFee } from 'src/utils/log/swap';

import Close from 'js/components/Icons/close';
import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import IconRightOutlined from '../Icons/RightOutlined';
import BottomModal from '../Modals/bottomModal';
import Spin from '../Spin';
import TokenIcon from '../Token/icon';

export default function EstNetworkFeeDetailModal({
  tryResp: _tryResp,
  onSelectPayGasToken,
  showDetailModal,
  hide,
  showRefundableTips,
}: {
  tryResp: any;
  onSelectPayGasToken: (gasToken: Token) => Promise<any>;
  showDetailModal: boolean;
  hide: () => void;
  showRefundableTips: boolean;
}) {
  const intl = useIntl();

  const [tryResp, setTryResp] = useState<any>(_tryResp);

  useEffect(() => {
    setTryResp(_tryResp);
  }, [_tryResp]);

  const [loading, setLoading] = useState(false);
  const hideModal = () => {
    hide();
  };

  const showModal = useShowModal();

  const {
    useGasTokens = [],
    usePayTokens = [],
    totalFeeValue,
    accoutRentValue,
    canSwitchPayToken,
  } = tryResp || {};

  const selectGasToken = useCallback(
    (gasToken: Token) => {
      setLoading(true);
      onSelectPayGasToken(gasToken)
        .then((resp: any) => {
          setTryResp(resp);
          setLoading(false);
        })
        .catch((err: any) => {
          logNetworkFee({
            newGasToken: gasToken,
            err,
          });
          setLoading(false);
          // message.error(intl.common_err);
        });
    },
    [onSelectPayGasToken]
  );

  return (
    <BottomModal onClose={hideModal} opened={showDetailModal}>
      <StyledModal className="modal-wrapper">
        <div className="modal-title">
          {intl.estimated_network_fee}
          <Close onClick={hideModal} />
        </div>
        <div className="modal-content">
          <Spin spinning={loading}>
            <div className="token-list">
              <div className="total">
                <div className="total-title">{intl.You_Pay}</div>
                <div className="total-value">
                  ${formatNetworFeeValue(totalFeeValue)}
                </div>
              </div>
              {useGasTokens.map((item: any) => {
                return (
                  <div className="token-item" key={item.token}>
                    <TokenIcon token={item} size={16} />
                    <div className="token-amount">{item.amount_display}</div>
                    <div className="token-symbol">{item.symbol}</div>
                    <div className="item-value">${item.value_display}</div>
                  </div>
                );
              })}
              {usePayTokens.map((item: any) => {
                return (
                  <div
                    className={`token-item ${
                      canSwitchPayToken ? 'cursor-pointer' : ''
                    }`}
                    key={item.token}
                    onClick={() => {
                      if (canSwitchPayToken) {
                        showModal({
                          modal: ModalKeys.chooseGasToken,
                          payGasToken: item,
                          onSelectPayGasToken: selectGasToken,
                        });
                      }
                    }}
                  >
                    <TokenIcon token={item} size={16} />
                    <div className="token-amount">{item.amount_display}</div>
                    <div className="token-symbol">{item.symbol}</div>
                    {canSwitchPayToken && <IconRightOutlined />}
                    <div className="item-value">${item.value_display}</div>
                  </div>
                );
              })}
            </div>
            {Number(accoutRentValue) > 0 && (
              <>
                <div className="refund-tips">
                  <div className="refund-tip-title">{intl.Refundable_Fee}</div>
                  <div className="refund-tip-value">
                    ${formatNetworFeeValue(accoutRentValue)}
                  </div>
                </div>
                <div className="account-rent-tips">
                  {showRefundableTips ? (
                    <> {intl.Returned_to_your_wallet_when_position_is_closed}</>
                  ) : (
                    <> {intl.Refundable_on_data_release}</>
                  )}
                </div>
              </>
            )}
          </Spin>
          <PrimaryBtn
            eventName="btn_est_network_fee_detail_close"
            onClick={hideModal}
          >
            {intl.Close}
          </PrimaryBtn>
        </div>
      </StyledModal>
    </BottomModal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  color: white;
  .modal-content {
    .token-list {
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .token-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      line-height: 20px;
      .item-value {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        margin-left: auto;
      }
    }
    .total {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .total-title {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        line-height: 20px;
      }
      .total-value {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        line-height: 20px;
      }
    }
    .refund-tips {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
      margin-top: 20px;
      border-top: 1px solid
        ${({ theme }: { theme: ThemeType }) => theme.innerBorder2};
      .refund-tip-title {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        line-height: 20px;
      }
      .refund-tip-value {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        line-height: 20px;
      }
    }
    .account-rent-tips {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      line-height: 20px;
    }
    .dg-primary {
      margin-top: 20px;
      width: 100%;
    }
  }
`;
