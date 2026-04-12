import React, { useState } from 'react';
import styled from 'styled-components';

import IconDown from 'src/components/Icons/downIcon';
import TokenIcon from 'src/components/Token/icon';
import { TurboRangeOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import CommonSenseSymbol from '../../../commonSenseSymbol';

export default function Withdrawed({ data }: { data: any }) {
  const [showTokens, setShowTokens] = useState(false);
  const [showYieldClaimedTokens, setShowYieldClaimedTokens] = useState(false);
  const intl = useIntl();
  const showReturned = data.rewards?.length > 0;

  if (data?.status !== TurboRangeOrderStatus.success) return null;

  return (
    <StyledWithdrawed>
      <div
        className="item cursor-pointer"
        onClick={() => setShowTokens((pre) => !pre)}
      >
        <div className="item-title">{intl.turboRange.capital_withdrawn}</div>
        <div className="item-desc">
          {data.withdrawn_value_display}
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
      {showReturned && (
        <div
          className="item cursor-pointer"
          onClick={() => setShowYieldClaimedTokens((pre) => !pre)}
        >
          <div className="item-title">{intl.turboRange.yield_claimed}</div>
          <div className="item-desc">
            {data.rewards_value_display}
            <IconDown rotate={showYieldClaimedTokens} />
          </div>
        </div>
      )}
      {showYieldClaimedTokens && (
        <div className="tokens">
          {(data.rewards || []).map((token: any) => {
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
    </StyledWithdrawed>
  );
}

const StyledWithdrawed = styled.div`
  width: 100%;

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
