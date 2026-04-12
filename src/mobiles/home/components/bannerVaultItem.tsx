import React from 'react';
import styled from 'styled-components';

import Apy from 'src/components/Earn/apy';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useCheckGetEarnDetail, useVault } from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';

export default function BannerVaultItem({ banner }: { banner: any }) {
  useCheckGetEarnDetail();
  const token = banner.token;
  const vault = useVault(banner.vault_id);
  const intl = useIntl();
  const isUsdc = token.symbol === 'USDC';
  const navigate = useCustomNavigate();

  return (
    <StyledBannerVaultItem
      onClick={() => {
        navigate(`/simple-earn/${banner.vault_id}`);
      }}
    >
      <TokenIcon token={token} hideChainIcon={isUsdc} />
      <div className="token-symbol">{token?.symbol}</div>
      <div className="apy-title">{intl.APY}</div>
      <Apy vault={vault} />
    </StyledBannerVaultItem>
  );
}

const StyledBannerVaultItem = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .token-symbol {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .apy-title {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    margin-left: auto;
  }
`;
