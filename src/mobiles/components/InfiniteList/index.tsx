import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

import Loader from 'src/components/Loader';

import { useIntl } from 'js/locals';

export default function InfiniteList({
  hasMore,
  dataLength,
  next,
  pullDownToRefresh,
  refreshFunction,
  children,
  scrollableTarget,
  height,
  hideNoMore,
  noDataText,
}: {
  hasMore: boolean;
  dataLength: number;
  next: () => void;
  pullDownToRefresh: boolean;
  refreshFunction?: () => void;
  children: React.ReactNode;
  scrollableTarget?: string;
  height?: number;
  hideNoMore?: boolean;
  noDataText?: string;
}) {
  const intl = useIntl();
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      pullDownToRefresh={pullDownToRefresh}
      refreshFunction={refreshFunction}
      hasMore={hasMore}
      pullDownToRefreshContent={
        <StyledRefreshText>{intl.scroll_down_to_refresh}</StyledRefreshText>
      }
      releaseToRefreshContent={
        <StyledRefreshText>
          {intl.release_to_refresh_immediately}
        </StyledRefreshText>
      }
      height={height}
      pullDownToRefreshThreshold={70}
      loader={
        dataLength > 0 && (
          <StyledRefreshText>
            <Loader />
          </StyledRefreshText>
        )
      }
      scrollableTarget={scrollableTarget}
      endMessage={
        !hasMore
          ? !hideNoMore && (
              <StyledRefreshText className="no-more">
                {noDataText || intl.no_more}
              </StyledRefreshText>
            )
          : null
      }
    >
      {children}
    </InfiniteScroll>
  );
}

const StyledRefreshText = styled.div`
  display: flex;
  padding: 10px 0 20px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.t_b7b};
  ${(props) => props.theme.fontRegular};
  font-size: 14px;
  &.no-more {
    padding-top: 40px;
  }
`;
