import React from 'react';
import styled from 'styled-components';

import { Input, PrimaryBtn } from 'src/UI';

import IconSearch from 'src/components/Icons/serch';
import { useIntl } from 'src/locals';
import { ThemeType, useThemeParams } from 'src/theme';

interface ManageTokensToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  onShowAddView: () => void;
}

export default function ManageTokensToolbar({
  search,
  setSearch,
  onShowAddView,
}: ManageTokensToolbarProps) {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const showSearchResults = !!search;

  return (
    <StyledManageTokensToolbar>
      <div className="toolbar-container">
        <Input
          uiVariant="homeSearch"
          leftSection={<IconSearch />}
          className="manage-tokens-search-input"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder={intl.btn_search}
        />
        {showSearchResults ? (
          <div
            className="cancel"
            onClick={() => {
              setSearch('');
            }}
          >
            {intl.Cancel}
          </div>
        ) : (
          <>
            {!isMobile ? (
              <PrimaryBtn
                eventName="manage_tokens_add_btn"
                className="add-btn"
                onClick={() => {
                  onShowAddView();
                }}
              >
                {intl.manage_tokens_add_btn}
              </PrimaryBtn>
            ) : null}
          </>
        )}
      </div>
    </StyledManageTokensToolbar>
  );
}

const StyledManageTokensToolbar = styled.div`
  padding: 10px 20px 0;
  margin-bottom: 20px;

  .toolbar-container {
    display: flex;
    align-items: center;
    gap: 10px;

    .add-btn.dg-primary {
      height: 40px;
      min-height: 40px;
      border-radius: 20px;
      min-width: 105px;
    }
  }

  .manage-tokens-search-input {
    flex: 1;
    min-width: 0;
  }

  .cancel {
    color: ${({ theme }: { theme: ThemeType }) => theme.mutedText};
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    @media (hover: hover) {
      &:hover {
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }
`;
