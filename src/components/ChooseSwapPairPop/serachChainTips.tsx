import React from 'react';
import styled from 'styled-components';

import { useChainInfosMap } from 'src/state/application/hooks';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';

import { useIntl } from 'js/locals';

export default function SearchChainTips() {
  const intl = useIntl();
  const chain = useUserFlag('choose_swap_pair_chain');
  const changeFlag = useChangeFlag('choose_swap_pair_chain');
  const chainInfosMap = useChainInfosMap();

  return (
    <StyledSearchChainTips className="search-chain-tips">
      {chain !== 'all' && (
        <div className="search-chain-inner">
          {intl.Filtering_with_CHAIN_network.replace(
            'CHAIN',
            (chainInfosMap as any)[chain]?.name
          )}
          <div
            className="clear"
            onClick={() => {
              changeFlag('all');
            }}
          >
            {intl.clear}
          </div>
        </div>
      )}
    </StyledSearchChainTips>
  );
}

const StyledSearchChainTips = styled.div`
  .search-chain-inner {
    display: flex;
    align-items: center;
    padding: 0 20px;
    line-height: 20px;
    font-size: 14px;
    margin-top: 15px;
    color: ${(props) => props.theme.t_b7b};
    gap: 4px;
    .clear {
      cursor: pointer;
      color: ${(props) => props.theme.blue};
    }
  }
`;
