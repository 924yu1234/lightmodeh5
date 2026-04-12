import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import PaginationWithTotal from 'src/components/Pagination/withTotal';
import { useIntl, useSetLocale } from 'src/locals';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';

import { getGiftClaimeds } from '../service';

export default function List({ giftInfo }: { giftInfo: any }) {
  const intl = useIntl();
  const total = giftInfo?.totalSize;
  const { id } = useParams();

  const pageSize = 100;
  const [current, setCurrent] = useState(1);
  const [claimed, setClaimed] = useState(giftInfo?.claimedSize);

  const [data, setData] = useState<any>([]);
  const { locale } = useSetLocale();
  useEffect(() => {
    getGiftClaimeds({
      code: id,
      offset: (current - 1) * pageSize,
      limit: pageSize,
    }).then((res: any) => {
      setData(res.list);
      setClaimed(res.claimed);
    });
  }, [id, current]);

  const formatShortDate = useCallback(
    (date: any) => {
      const dayjsLocale = locale === 'zh-CN' ? 'zh-cn' : 'en';
      dayjs.locale(dayjsLocale);

      const dateObj = dayjs(date);
      const today = dayjs();

      // 检查是否是今天
      if (dateObj.isSame(today, 'day')) {
        return intl.gift.Today;
      }
      let showYear = false;
      if (!dateObj.isSame(today, 'year')) {
        showYear = true;
      }

      // 不是今天，返回格式化的日期
      if (locale === 'zh-CN' || locale === 'zh-TW') {
        return dateObj.format(showYear ? 'YYYY年M月D日' : 'M月D日'); // 8月1日
      }
      return dateObj.format(showYear ? 'D MMM, YYYY' : 'D MMM'); // 1 Aug
    },
    [locale, intl]
  );
  return (
    <StyledClaimedList>
      <div className="claimed-title">
        {intl.gift.Gifts_claimed_CLAIMED_TOTAL.replace(
          'CLAIMED',
          isNumber(claimed) ? claimed : '-'
        ).replace('TOTAL', total || '-')}
      </div>
      <div className="claimed-list">
        {data.map((item: any, index: number) => (
          <div key={item.id} className="claimed-item">
            <div className="claimed-item-title">#{index + 1}</div>
            <div className="claimed-item-amount">
              {giftInfo?.amountPerClaim} SOL
            </div>
            <div className="claimed-item-time">{formatShortDate(item)}</div>
          </div>
        ))}
      </div>
      <PaginationWithTotal
        current={current}
        onChange={(c) => {
          setCurrent(c);
        }}
        total={claimed}
        pageSize={pageSize}
        hidePageSizeSelect
        hideGoTo
        setPageSize={() => {}}
      />
    </StyledClaimedList>
  );
}
const StyledClaimedList = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 25px;
  .claimed-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    margin-bottom: 10px;
  }
  .claimed-list {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 10px;
  }
  .claimed-item {
    display: flex;
    align-items: center;
    gap: 10px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 20px;
    margin-bottom: 10px;
    .claimed-item-title {
      line-height: 20px;
      min-width: 30px;
    }
    .claimed-item-amount {
      margin-right: auto;
    }
    .claimed-item-time {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
`;
