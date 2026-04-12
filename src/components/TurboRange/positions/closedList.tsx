import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Button } from 'src/UI';

import Empty from 'src/components/Empty';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import InfiniteList from 'src/mobiles/components/InfiniteList';
import { useHasAccessToken } from 'src/providers/useWallet';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { useGetTurboRangePositions } from 'src/state/turboRange/service';
import { ThemeType, useThemeParams } from 'src/theme';

import SkeletonPositionClosed from '../Skeletons/PositionClosed';
import ClosedItem from './closedItem';

/** 切换 Tab 卸载后仍展示上次成功拉取的第一页，同时后台重新请求 */
let closedPositionsFirstPageCache: TurboRangePosition[] = [];
let closedPositionsFirstPageHasNext = false;

export default function ClosedList({
  inBalancePage,
}: {
  inBalancePage: boolean;
}) {
  const getTurboRangePositions = useGetTurboRangePositions();
  const hasAccessToken = useHasAccessToken();
  const [current, setCurrent] = useState(1);
  const [positions, setPositions] = useState<TurboRangePosition[]>(() => [
    ...closedPositionsFirstPageCache,
  ]);
  const [loadingPositions, setLoadingPositions] = useState(
    () => closedPositionsFirstPageCache.length === 0
  );
  const [hasNext, setHasNext] = useState(() => closedPositionsFirstPageHasNext);
  const { viewWidth, isMobile } = useThemeParams();
  let pageSize = 21;
  let skeletonCount = 6;
  if (viewWidth >= 1920) {
    pageSize = 24;
    skeletonCount = 8;
  }
  const gridTemplateColumns = useMemo(() => {
    if (isMobile) return '1fr';
    if (viewWidth >= 1920) {
      return 'repeat(4, 1fr)';
    }
    return 'repeat(3, 1fr)';
  }, [isMobile, viewWidth]);

  function loadMore(page: number, opts?: { silent?: boolean }) {
    const silent = opts?.silent ?? false;
    if (page === 1 && !silent) {
      setLoadingPositions(true);
    }
    getTurboRangePositions({
      pageSize,
      offset: (page - 1) * pageSize,
      status: 'CLOSED',
    }).then((resp: any) => {
      setCurrent(page);
      setPositions((pre) => {
        if (page === 1) {
          closedPositionsFirstPageCache = resp.list ?? [];
          closedPositionsFirstPageHasNext = resp.hasNext;
          return resp.list;
        }
        return pre.concat(resp.list);
      });
      setLoadingPositions(false);
      setHasNext(resp.hasNext);
    });
  }

  useEffect(() => {
    loadMore(1, {
      silent: closedPositionsFirstPageCache.length > 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTurboRangePositions]);

  useEffect(() => {
    if (!hasAccessToken) {
      closedPositionsFirstPageCache = [];
      closedPositionsFirstPageHasNext = false;
    }
  }, [hasAccessToken]);

  const intl = useIntl();
  const navigate = useCustomNavigate();

  return (
    <>
      <StyledPositionsList
        className="positions-list"
        id="turboRangeClosedList"
        gridTemplateColumns={gridTemplateColumns}
      >
        {positions?.length === 0 && !loadingPositions && (
          <Empty>
            <div className="empty-text">
              {intl.turboRange.you_have_no_position}
              {inBalancePage && (
                <Button
                  uiVariant="ghost"
                  onClick={() => navigate('/turbo-range')}
                  style={{ marginTop: '15px', minWidth: '200px' }}
                >
                  {intl.go_to_turbo_range}
                </Button>
              )}
            </div>
          </Empty>
        )}
        {current === 1 && loadingPositions ? (
          <div className="skeleton-grid">
            {new Array(skeletonCount).fill(0).map((item, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <SkeletonPositionClosed key={`${index}skeleton`} />;
            })}
          </div>
        ) : (
          <InfiniteList
            dataLength={positions.length}
            next={() => {
              loadMore(current + 1);
            }}
            pullDownToRefresh={false}
            refreshFunction={() => {}}
            hasMore={hasNext}
            hideNoMore
            scrollableTarget={
              isMobile ? 'turboRangeClosedList' : 'appContainer'
            }
          >
            {positions.map((position) => {
              return (
                <ClosedItem
                  key={position.id}
                  position={position}
                  inBalancePage={inBalancePage}
                />
              );
            })}
            {hasAccessToken && positions.length > 0 && !hasNext && (
              <div className="no-more">{intl.no_more}</div>
            )}
          </InfiniteList>
        )}
      </StyledPositionsList>
    </>
  );
}

const StyledPositionsList = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  min-height: 200px;
  overflow-y: auto;
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
  .infinite-scroll-component {
    display: grid !important;
    grid-template-columns: ${({
      gridTemplateColumns,
    }: {
      gridTemplateColumns: string;
    }) => gridTemplateColumns};
    gap: ${({ theme }: { theme: ThemeType }) => (theme.isMobile ? 12 : 20)}px;
    overflow: visible !important;
  }
  .item {
    padding: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '18px 20px' : '20px 24px'};
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    border-radius: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '10px' : '10px'};
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
    }
    transition: all 0.2s ease;
    .item-top {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 30px;
      margin-bottom: 11px;
      .item-symbol {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        font-size: 16px;
        line-height: 20px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        margin-right: auto;
      }
    }
    .item-infos {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px 16px;
      .item-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        .item-info-title {
          font-size: 12px;
          line-height: 18px;
          white-space: nowrap;
          color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
        }
        .item-info-value {
          font-size: 16px;
          line-height: 18px;
          color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        }
      }
    }
    .item-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
      .btn-view-details,
      .btn-reopen {
        flex: 1;
        height: 32px;
        border-radius: 6px;
        font-size: 13px;
        cursor: pointer;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        transition: all 0.15s ease;
      }
      .btn-view-details {
        background: transparent;
        border: 1px solid ${({ theme }) => theme.border_blue_50};
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        &:hover {
          background: ${({ theme }) => theme.bg_white_07};
        }
      }
      .btn-reopen {
        background: ${({ theme }) => theme.blue};
        border: none;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_000};
        &:hover {
          opacity: 0.85;
        }
      }
    }
  }
  .no-more {
    grid-column: 1 / -1;
    font-size: 12px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    text-align: center;
    margin-top: 20px;
  }
  .dg-empty {
    width: 100%;
  }
  .skeleton-grid {
    display: grid;
    grid-template-columns: ${({
      gridTemplateColumns,
    }: {
      gridTemplateColumns: string;
    }) => gridTemplateColumns};
    gap: ${({ theme }: { theme: ThemeType }) => (theme.isMobile ? 12 : 20)}px;
  }
`;
