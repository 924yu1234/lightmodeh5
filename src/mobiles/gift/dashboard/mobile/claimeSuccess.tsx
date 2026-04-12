import React from 'react';
import queryString from 'query-string';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import GALinkWrapper from 'src/components/GA/LinkWrapper';
import { TOKEN_SOL_ICON } from 'src/da';
import { useNavigateAppH5 } from 'src/h5/navigateApp';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function ClaimeSuccess({ giftInfo }: { giftInfo: any }) {
  const intl = useIntl();
  const navigateApp = useNavigateAppH5();
  const navigate = useCustomNavigate();
  const { s = '' } = queryString.parse(location.search) ?? {};

  return (
    <StyledTipsConnect>
      <div className="box">
        <div className="box-title">{intl.gift.Cash_Gift_for_CopyTrade}</div>
        <div className="box-volume">
          {giftInfo?.tokenSymbol === 'SOL' && (
            <img
              src={TOKEN_SOL_ICON}
              alt={giftInfo?.tokenSymbol}
              className="token-icon"
            />
          )}
          {giftInfo?.amountPerClaim} {giftInfo?.tokenSymbol}
        </div>
      </div>
      <PrimaryBtn
        eventName="gift_box_btn_receive_gift_in_degate_app"
        onClick={() => {
          navigateApp(
            `${window.location.origin}/gift/${giftInfo?.code}?s=${s}`
          );
        }}
      >
        {intl.gift.Receive_gift_in_DeGate_App}
      </PrimaryBtn>
      <GALinkWrapper
        eventName="btn_gift_box_to_view_account"
        className="link"
        onClick={() => {
          navigate('/download');
        }}
      >
        {intl.gift.Download_App}
      </GALinkWrapper>
    </StyledTipsConnect>
  );
}

const StyledTipsConnect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .box {
    width: 300px;
    height: 300px;
    background: ${({ theme }: { theme: ThemeType }) => theme.green};
    border-radius: 50%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .box-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }) => theme.t_000};
      font-size: 18px;
      line-height: 24px;
    }
    .box-volume {
      margin-top: 15px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      color: ${({ theme }) => theme.t_000};
      font-size: 22px;
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      .token-icon {
        width: 24px;
        border-radius: 50%;
        height: 24px;
      }
    }
    .box-tips {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 16px;
      line-height: 20px;
      color: ${({ theme }) => theme.t_000};
      text-align: center;
      margin-top: 15px;
    }
  }

  .dg-primary {
    margin-top: 45px;
    min-width: 230px;
  }

  .link {
    margin-top: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 30px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    cursor: pointer;
  }
`;
