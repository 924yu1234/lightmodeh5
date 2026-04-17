import React from 'react';
import iconHide from 'imgs/icon_hide.svg';
import iconShow from 'imgs/icon_show.svg';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import ExcessiveBalanceTipsEntry from 'src/components/ExcessiveBalanceTips';
import ReceiveGuide from 'src/components/ExternalWalletGuide/ReceiveGuide';
import IconWrapper from 'src/components/Icons/IconWrapper';
import { useTotalAssetValue } from 'src/hooks/useAssets';
import { useOprBuyWithCashLink } from 'src/state/application/hooks';
import useReceive from 'src/state/dexAccount/opr/useReceive';
import useSend from 'src/state/dexAccount/opr/useSend';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import { useIntl } from 'js/locals';
import { useChangeHideAssets, useIsHideAssets } from 'js/state/user/hooks';
import digit from 'js/utils/digit';

export default function AssetsTop() {
  const isHide = useIsHideAssets();
  const changeHideAssets = useChangeHideAssets();
  const receive = useReceive();
  const send = useSend();
  const intl = useIntl();
  const totalAssetValue = useTotalAssetValue();

  const oprBuyWithCashLink = useOprBuyWithCashLink();

  return (
    <StyledTop className="top-tpl">
      <ExcessiveBalanceTipsEntry />
      <div className="box">
        <div className="total">
          <div className="item-title">
            {intl['account.total_value']}
            <IconWrapper onClick={() => changeHideAssets(!isHide)}>
              <img
                src={isHide ? iconHide : iconShow}
                alt="hide"
                className="asset-toggle-icon"
              />
            </IconWrapper>
          </div>
          <div className="item-value">
            <span className="amount">
              {isHide
                ? '********'
                : `$${digit.format(totalAssetValue, '0,0.00')}`}
            </span>
          </div>
        </div>
      </div>

      <div className="top-btns">
        <ReceiveGuide>
          <div>
            <PrimaryBtn
              eventName="btn_balance_receive"
              onClick={() => {
                receive();
              }}
            >
              {intl.Receive}
            </PrimaryBtn>
          </div>
        </ReceiveGuide>

        <GhostBtn
          eventName="btn_balance_send"
          onClick={() => {
            send({ token: undefined });
          }}
        >
          {intl.Send}
        </GhostBtn>

        {oprBuyWithCashLink && (
          <GhostBtn
            eventName="btn_balance_cash_buy"
            onClick={() => {
              WindowOpen(oprBuyWithCashLink);
            }}
          >
            {intl.Cash_Buy}
          </GhostBtn>
        )}
      </div>
    </StyledTop>
  );
}

const StyledTop = styled.div`
  width: 100%;
  margin-bottom: 30px;
  .excessive-balance-tips-entry {
    margin-bottom: 10px;
    height: 36px;
    .icon-right-outlined {
      margin-left: 0;
    }
  }
  .box {
    width: 100%;
    height: 110px;
    background: ${({ theme }: { theme: ThemeType }) => theme.cardBg};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 25px 20px;
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
    .total,
    .profits {
      min-width: 130px;
      .item-title {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.mutedText};
        line-height: 24px;
        display: flex;
        align-items: center;
        letter-spacing: 0.01em;
      }
      .item-value {
        ${({ theme }: { theme: ThemeType }) => theme.fontBold};
        font-size: 22px;
        color: ${({ theme }: { theme: ThemeType }) => theme.ink};
        line-height: 36px;
        letter-spacing: -0.02em;
      }
    }
    .line {
      background: ${(props) => props.theme.innerBorder2};
      width: 1px;
      height: 100%;
      margin: 0 50px;
    }
    .link {
      white-space: nowrap;
      margin-left: 50px;
      margin-right: 50px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      cursor: pointer;
      line-height: 24px;
      margin-top: 25px;
    }
  }
  .top-btns {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    .dg-primary,
    .dg-ghost {
      min-width: 140px;
      padding: 0 10px;
      height: 46px;
      font-size: 14px;
    }
  }
`;
