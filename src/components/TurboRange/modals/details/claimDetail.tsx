import React, { useEffect, useState } from 'react';
import { usePrevious } from 'ahooks';
import styled from 'styled-components';

import GALinkWrapper from 'src/components/GA/LinkWrapper';
import GasDetailsInDetail from 'src/components/Gas/gasDetailsInDetail';
import IconDown from 'src/components/Icons/downIcon';
import BottomModal from 'src/components/Modals/bottomModal';
import TokenIcon from 'src/components/Token/icon';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useTurboRangeOrderProgress } from 'src/state/turboRange/useTurboRangeOrderProgress';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import CommonSenseSymbol from '../../commonSenseSymbol';
import ProductName from '../../productName';
import TurboRangeOrderStatusEle from '../../status';
import useRedirectAndOpenPosition from './useRedirectAndOpenPosition';

export default function TurboRangeRewardDetailModal() {
  const { visible, hide, order } = useModals(ModalKeys.turboRangeRewardDetail);
  const [showTokens, setShowTokens] = useState(false);
  const dexAccount = useDexAccount();
  const preAccount = usePrevious(dexAccount?.account);

  const intl = useIntl();
  const data = useTurboRangeOrderProgress({
    order: { ...order, type: 'reward' },
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
      className="full-modal"
      opened={visible}
      zIndex={201}
    >
      <StyledDetail className="modal-wrapper">
        <div className="modal-title">
          {intl.Claim}
          <Close onClick={hide} />
        </div>
        {data && (
          <div className="modal-content hideScrollBar">
            <TurboRangeOrderStatusEle status={data.status} />
            <div className="line" />
            {data.tokens?.length > 0 && (
              <>
                <div
                  className="item cursor-pointer"
                  onClick={() => setShowTokens((pre) => !pre)}
                >
                  <div className="item-title">
                    {intl.turboRange.yield_claimed}
                  </div>
                  <div className="item-desc">
                    {data.rewards_value_display}
                    <IconDown rotate={showTokens} />
                  </div>
                </div>
                {showTokens && (
                  <div className="tokens">
                    {(data.tokens || []).map((token: any) => {
                      return (
                        <div className="token-item">
                          <TokenIcon token={token} hideChainIcon size={16} />
                          <div>{token.amount_display}</div>
                          <CommonSenseSymbol
                            poolAddress={data.pool_address}
                            token={token}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            <GasDetailsInDetail
              gas_data={data?.gas_data}
              net_fee_estimated={data?.net_fee_estimated}
              net_fee_used={data?.net_fee_used}
            />
            <div className="item">
              <div className="item-title">{intl.Product}</div>
              <div className="item-desc">
                <ProductName poolAddress={data.pool_address} />
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
