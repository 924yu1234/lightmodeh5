import React from 'react';
import styled from 'styled-components';

import {
  useAssetMessages,
  useFetchNextPageAssetMessages,
} from 'src/state/message/hooks';

import { useIntl } from 'js/locals';

import AssetMessageTokenItem from './tokenItem';

export default function AssetMessages() {
  const intl = useIntl();
  const fetchNextPage = useFetchNextPageAssetMessages();
  const { list, hasNext } = useAssetMessages();

  return (
    <StyledList className="list">
      {list.map((l) => {
        return <AssetMessageTokenItem data={l} key={l.id} />;
      })}
      {list.length === 0 && <div className="empty"></div>}
      {hasNext ? (
        <div className="view-more" onClick={fetchNextPage}>
          {intl.view_more}
        </div>
      ) : (
        <div className="no-more">{intl.thats_all}</div>
      )}
    </StyledList>
  );
}

const StyledList = styled.div`
  .empty {
    height: 60px;
    width: 100%;
  }
`;
