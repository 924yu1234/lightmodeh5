import React from 'react';
import styled from 'styled-components';

import IconDiscord from 'src/components/Icons/discord';
import RightOutlined from 'src/components/Icons/RightOutlined';
import IconTelegram from 'src/components/Icons/telegram';
import IconWebsite from 'src/components/Icons/website';
import IconX from 'src/components/Icons/x';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import LinkWrapper from 'js/components/LinkWrapper';
import WindowOpen from 'js/utils/windowOpen';

import Token from '../token';

export default function SwapPairInfo({ baseToken }: { baseToken: any }) {
  const intl = useIntl();

  return (
    <StyledPairInfoModal>
      <Token token={baseToken} />
      {(baseToken?.website ||
        baseToken?.twitter ||
        baseToken?.telegram ||
        baseToken?.discord) && (
        <div className="socials">
          <div className="socials-line" />
          {baseToken?.website && (
            <LinkWrapper
              url={baseToken.website}
              colorInherit
              onClick={() => {
                WindowOpen(baseToken.website);
              }}
            >
              <div className="item">
                <IconWebsite /> {intl.Website} <RightOutlined size={10} />
              </div>
            </LinkWrapper>
          )}
          {baseToken?.twitter && (
            <LinkWrapper
              url={baseToken.twitter}
              colorInherit
              onClick={() => {
                WindowOpen(baseToken.twitter);
              }}
            >
              <div className="item">
                <IconX /> {intl.Twitter} <RightOutlined size={10} />
              </div>
            </LinkWrapper>
          )}
          {baseToken?.telegram && (
            <LinkWrapper
              url={baseToken.telegram}
              colorInherit
              onClick={() => {
                WindowOpen(baseToken.telegram);
              }}
            >
              <div className="item">
                <IconTelegram /> {intl.Telegram} <RightOutlined size={10} />
              </div>
            </LinkWrapper>
          )}
          {baseToken?.discord && (
            <LinkWrapper
              url={baseToken.discord}
              colorInherit
              onClick={() => {
                WindowOpen(baseToken.discord);
              }}
            >
              <div className="item">
                <IconDiscord /> Discord <RightOutlined size={10} />
              </div>
            </LinkWrapper>
          )}
        </div>
      )}
    </StyledPairInfoModal>
  );
}

const StyledPairInfoModal = styled.div`
  width: 100%;
  padding: 10px 0 0 0;
  .socials {
    .socials-line {
      border-top: 1px solid rgba(58, 66, 89, 0.5);
    }
    padding: 0 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    line-height: 20px;
    .item {
      cursor: pointer;
      margin-top: 30px;
      display: flex;
      align-items: center;
      .dg-icon {
        margin-right: 5px;
      }
      .icon-right-outlined {
        margin-left: 10px;
      }
    }
  }
`;
