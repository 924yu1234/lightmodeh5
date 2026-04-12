import React, { useMemo } from 'react';
import styled from 'styled-components';

import ChainIcon from 'src/components/ChainIcon';
import { Type_DAChains } from 'src/da';
import { useChainInfosMap } from 'src/state/application/hooks';
import { useMorphoRewards } from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';

import MorphoTable from './Morpho';

export default function MorphoWrapper() {
  const showList = useMorphoRewards();
  const groupedList = useMemo(() => {
    return showList.reduce((acc, item) => {
      acc[item.chain] = acc[item.chain] || [];
      acc[item.chain].push(item);
      return acc;
    }, {});
  }, [showList]);
  const chainInfosMap = useChainInfosMap();
  const res = Object.keys(groupedList);

  if (!res?.length) return null;

  return (
    <StyledEarnTable className="rewards-table">
      <div className="rewards-title">Morpho</div>
      {res.map((chain) => {
        const list = groupedList[chain];
        return (
          <div className="rewards-table" key={chain}>
            <div className="rewards-chain-title">
              <ChainIcon chain={chain as Type_DAChains} />
              {chainInfosMap[chain as Type_DAChains]?.name || chain}
            </div>
            <MorphoTable key={chain} list={list} />
          </div>
        );
      })}
    </StyledEarnTable>
  );
}

export const StyledEarnTable = styled.div`
  min-height: 260px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .rewards-chain-title {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 20px;
    margin-bottom: 10px;
  }
  .rewards-title {
    font-size: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 24px;
    margin-bottom: 20px;
  }
  .dg-primary {
    margin-top: 20px;
    min-width: 200px;
  }
`;
