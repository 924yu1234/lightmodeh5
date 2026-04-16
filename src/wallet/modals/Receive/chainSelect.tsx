import React from 'react';
import styled from 'styled-components';

import ChainIcon from 'src/components/ChainIcon';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType, useThemeParams } from 'src/theme';

import ChainSelectMobile from './chainSelectMobile';
import ChainSelectPC from './chainSelectPC';

export default function WalletReceiveChainSelect({
  value,
  onChange,
  disabled,
}: {
  value?: Type_DAChains | '';
  onChange: (chainId: Type_DAChains) => void;
  disabled?: boolean;
}) {
  const { isMobile } = useThemeParams();
  const chainInfoMap = useChainInfosMap();
  const intl = useIntl();

  if (disabled) {
    return (
      <StyledChainSelect className="disabled-chain-select">
        <div className="select-placeholder">{intl.Network}</div>
        <ChainIcon chain={value as Type_DAChains} size={28} />
        {chainInfoMap[value as Type_DAChains]?.name}
      </StyledChainSelect>
    );
  }

  if (isMobile) {
    return <ChainSelectMobile value={value} onChange={onChange} />;
  }
  return <ChainSelectPC value={value} onChange={onChange} />;
}

const StyledChainSelect = styled.div`
  width: 100%;
  height: 50px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  background: ${({ theme }: { theme: ThemeType }) => theme.inputBg};
  border: 1px solid ${({ theme }) => theme.border_transparent};
  border-radius: 5px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  .select-placeholder {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    margin-right: auto;
  }
`;
