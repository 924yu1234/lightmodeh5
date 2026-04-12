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
      <TokenIcon
        token={token}
        hideChainIcon={isUsdc}
        size={40}
        className="token-icon"
      />
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
  border: 1px solid ${({ theme }) => theme.border_transparent};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  background: ${({ theme }) => theme.bg_white_06};
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
  cursor: pointer;

  .token-symbol {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 24px;
  }
  .apy-title {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-left: auto;
    font-size: 16px;
  }
  .apy {
    font-size: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
  }
  &:hover {
    background-image: linear-gradient(
      1deg,
      rgba(0, 160, 255, 0.3) 0%,
      rgba(0, 160, 255, 0) 100%
    );
    border: 1px solid ${({ theme }) => theme.border_b7b_30};
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
    border-radius: 5px;
  }
`;
