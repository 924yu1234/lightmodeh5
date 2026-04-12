import React from 'react';
import styled from 'styled-components';

import { FUNGIBLE_USDC_ID, Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

export default function ChainNameTag({
  chain,
  id,
}: {
  chain: Type_DAChains;
  id: number;
}) {
  const intl = useIntl();
  const chainInfosMap = useChainInfosMap();
  const chainInfo = chainInfosMap[chain];
  let name = chainInfo?.name;
  if (id === FUNGIBLE_USDC_ID) {
    name = intl.multi_chain;
  }
  return <StyledChainNameTag>{name || chain}</StyledChainNameTag>;
}

const StyledChainNameTag = styled.div`
  background: ${({ theme }: { theme: ThemeType }) => theme.t_fff_10};
  border-radius: 2px;
  padding: 0 5px;
  height: 18px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 11px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  display: flex;
  align-items: center;
  justify-content: center;
`;
