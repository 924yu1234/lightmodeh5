import React from 'react';
import styled from 'styled-components';

import AddressOpr from 'src/components/addressOpr';
import ChainIcon from 'src/components/ChainIcon';
import { useIntl } from 'src/locals';
import { useChainInfosMap, useChains } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

export default function DA() {
  const intl = useIntl();
  const chains = useChains();
  const chainInfoMap = useChainInfosMap();
  const dexAccount = useDexAccount();
  const das = dexAccount?.DAs || {};

  return (
    <StyledDA className="das">
      <div className="chains-title">
        {intl.My_Address} ({chains?.length})
      </div>
      {chains.map((chain) => {
        const da = (das as any)[chain];
        if (!da) return null;
        return (
          <div className="das-address" key={chain}>
            <div className="das-address-title">
              <ChainIcon chain={chain} size={20} />
              {intl.CHAIN_address?.replace('CHAIN', chainInfoMap[chain]?.name)}
            </div>
            <div className="das-address-value">
              <div className="das-address-value-address">{da.address}</div>
              <AddressOpr address={da.address} chain={da.chain} />
            </div>
          </div>
        );
      })}
    </StyledDA>
  );
}

const StyledDA = styled.div`
  padding: 20px 0;
  .chains-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 20px;
    margin-bottom: 10px;
  }

  .das-address {
    margin-top: 15px;
    background: ${({ theme }) => theme.bg_white_10};
    padding: 10px;

    .das-address-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 20px;
      text-align: left;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .das-address-value {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 20px;

      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 15px;

      .dg-icon-wrapper {
        &:hover {
          .dg-icon {
            color: ${({ theme }: { theme: ThemeType }) => theme.blue};
          }
        }
      }

      .dg-icon {
        cursor: pointer;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      }
    }
  }
`;
