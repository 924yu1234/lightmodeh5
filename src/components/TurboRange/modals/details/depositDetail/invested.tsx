import React, { useState } from 'react';
import styled from 'styled-components';

import IconDown from 'src/components/Icons/downIcon';
import TokenIcon from 'src/components/Token/icon';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import CommonSenseSymbol from '../../../commonSenseSymbol';

export default function Invested({ data }: { data?: any }) {
  const [showTokens, setShowTokens] = useState(false);
  const [showReturnedTokens, setShowReturnedTokens] = useState(false);
  const intl = useIntl();

  const capitalTokens = data?.capitalTokens || [];
  const returnTokens = data?.returnTokens || [];
  const showReturned = returnTokens.length > 0;

  return (
    <StyledInvested>
      <div
        className="item cursor-pointer"
        onClick={() => setShowTokens((pre) => !pre)}
      >
        <div className="item-title">{intl.turboRange.invested}</div>
        <div className="item-desc">
          {data?.principalValue_display}
          <IconDown rotate={showTokens} />
        </div>
      </div>
      {showTokens && (
        <div className="tokens">
          {capitalTokens.map((token: any) => (
            <div className="token-item">
              <TokenIcon token={token} size={16} hideChainIcon />
              <div>{token.amount_display}</div>
              <CommonSenseSymbol
                poolAddress={data?.poolAddress || ''}
                token={token}
              />
            </div>
          ))}
        </div>
      )}
      {showReturned && (
        <div
          className="item cursor-pointer"
          onClick={() => setShowReturnedTokens((pre) => !pre)}
        >
          <div className="item-title">{intl.turboRange.returned}</div>
          <div className="item-desc">
            {data?.retValue_display}
            <IconDown rotate={showReturnedTokens} />
          </div>
        </div>
      )}
      {showReturnedTokens && (
        <div className="tokens">
          {returnTokens.map((token: any) => (
            <div className="token-item">
              <TokenIcon token={token} size={16} hideChainIcon />
              <div>{token.amount_display}</div>
              <CommonSenseSymbol
                poolAddress={data?.poolAddress || ''}
                token={token}
              />
            </div>
          ))}
        </div>
      )}
    </StyledInvested>
  );
}

const StyledInvested = styled.div`
  width: 100%;

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
`;
