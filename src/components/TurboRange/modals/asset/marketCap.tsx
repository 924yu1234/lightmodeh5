import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatTurnover } from 'src/utils/format';
export default function MarketCap({ product }: { product: any }) {
  const intl = useIntl();
  const marketCap = product?.marketCap;
  const marketCapValue = formatTurnover(marketCap, { maxDecimals: 2 });
  const date = product?.marketCapDate;
  const dateString = dayjs(date).format('YYYY-MM-DD');
  if (!marketCap) return null;

  const title = intl.turboRange.market_cap_of_paxg.replace(
    '{PAXG}',
    product?.baseToken?.symbol
  );

  return (
    <StyledTvl>
      <div className="item-title" style={{ marginTop: '25px' }}>
        {title}
      </div>
      <div className="tvl-value">
        {intl.turboRange.XX_as_of_DATE.replace(
          '{XX}',
          `$${marketCapValue}`
        ).replace('{DATE}', dateString)}
      </div>
    </StyledTvl>
  );
}

const StyledTvl = styled.div`
  margin-bottom: 25px;
  .tvl-value {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
`;
