import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import { useXStockDetail } from './dataProvider';

export default function News() {
  const { news } = useXStockDetail();
  const feed = news?.feed;
  const intl = useIntl();
  if (!feed || feed?.length === 0) {
    return null;
  }
  return (
    <StyledNews className="news-container">
      <div className="news-title">{intl.stocks.News_Flow}</div>
      <div className="news-list">
        {feed?.slice(0, 3).map((item: any) => (
          <div className="news-item" key={item.id}>
            <div className="news-item-time">
              {dayjs(item.time_published).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div
              className="news-item-title"
              onClick={() => {
                WindowOpen(item.url);
              }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </StyledNews>
  );
}

const StyledNews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  .news-title {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
  }
  .news-list {
    padding: 0 5px 0 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    height: 400px;
  }
  .news-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .news-item-time {
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
    .news-item-title {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      line-height: 18px;
      cursor: pointer;
    }
  }
`;
