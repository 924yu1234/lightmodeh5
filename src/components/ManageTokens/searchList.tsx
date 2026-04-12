import React from 'react';
import styled from 'styled-components';

import { FUNGIBLE_USDC_ID } from 'src/da';
import {
  type ManagedTokenAction,
  createManagedTokenKey,
} from 'src/hooks/useAssets';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import IconEmpty from '../Icons/empty';
import ManageTokenRow from './tokenRow';

interface ManageTokensSearchListProps {
  searchResults: any[];
  searching: boolean;
  isMyAsset: (token: any) => boolean;
  addToken: (token: any) => void;
  onRequestRemove: (token: any) => void;
}

export default function ManageTokensSearchList({
  searchResults,
  searching,
  isMyAsset,
  addToken,
  onRequestRemove,
}: ManageTokensSearchListProps) {
  const intl = useIntl();

  return (
    <StyledManageTokensSearchList>
      {searchResults.map((token) => {
        let action: ManagedTokenAction = 'add';
        if (token.id === FUNGIBLE_USDC_ID) {
          action = 'disabled';
        } else if (isMyAsset(token)) {
          action = 'remove';
        }

        return (
          <ManageTokenRow
            key={createManagedTokenKey(token)}
            token={token}
            action={action}
            onClickAction={(nextToken) => {
              if (action === 'add') {
                addToken(nextToken);
              } else if (action === 'remove') {
                onRequestRemove(nextToken);
              }
            }}
          />
        );
      })}
      {!searching && searchResults.length === 0 && (
        <div className="empty-text">
          <IconEmpty />
          {intl.no_result_found}
        </div>
      )}
    </StyledManageTokensSearchList>
  );
}

const StyledManageTokensSearchList = styled.div`
  .empty-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    font-size: 13px;
    line-height: 20px;
    padding: 20px 0 4px;
    text-align: center;
  }
`;
