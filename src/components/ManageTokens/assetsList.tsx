import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { FUNGIBLE_USDC_ID } from 'src/da';
import { createManagedTokenKey } from 'src/hooks/useAssets';
import { useIntl } from 'src/locals';
import InfiniteList from 'src/mobiles/components/InfiniteList';
import { ThemeType } from 'src/theme';

import ManageTokenRow from './tokenRow';

interface ManageTokensAssetsListProps {
  myAssets: any[];
  otherAssets: any[];
  addToken: (token: any) => void;
  onRequestRemove: (token: any) => void;
}

const OTHER_ASSETS_PAGE_SIZE = 30;

export default function ManageTokensAssetsList({
  myAssets,
  otherAssets,
  addToken,
  onRequestRemove,
}: ManageTokensAssetsListProps) {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);

  const visibleOtherAssets = useMemo(() => {
    return otherAssets.slice(0, current * OTHER_ASSETS_PAGE_SIZE);
  }, [otherAssets, current]);

  return (
    <StyledManageTokensAssetsList>
      <InfiniteList
        dataLength={visibleOtherAssets.length}
        next={() => {
          setCurrent((prev) => prev + 1);
        }}
        pullDownToRefresh={false}
        refreshFunction={() => {}}
        hasMore={current * OTHER_ASSETS_PAGE_SIZE < otherAssets.length}
        scrollableTarget="manageTokensBody"
        hideNoMore
      >
        <div className="section-title">{intl.manage_tokens_my_assets}</div>
        {myAssets.map((token) => {
          const action = token.id === FUNGIBLE_USDC_ID ? 'disabled' : 'remove';

          return (
            <ManageTokenRow
              key={createManagedTokenKey(token)}
              token={token}
              action={action}
              onClickAction={onRequestRemove}
            />
          );
        })}
        {otherAssets?.length > 0 && (
          <>
            <div className="section-title other">
              {intl.manage_tokens_other_assets}
            </div>
            {visibleOtherAssets.map((token) => {
              return (
                <ManageTokenRow
                  key={createManagedTokenKey(token)}
                  token={token}
                  action="add"
                  onClickAction={addToken}
                />
              );
            })}
          </>
        )}
      </InfiniteList>
    </StyledManageTokensAssetsList>
  );
}

const StyledManageTokensAssetsList = styled.div`
  .section-title {
    padding: 0 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 19px;
    margin: 0 0 10px;

    &.other {
      margin-top: 20px;
    }
  }

  .empty-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    font-size: 13px;
    line-height: 20px;
    padding: 20px 0 4px;
    text-align: center;
  }
`;
