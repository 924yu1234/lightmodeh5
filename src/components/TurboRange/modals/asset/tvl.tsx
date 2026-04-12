import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatTurnover } from 'src/utils/format';
export default function Tvl({ product }: { product: any }) {
  const intl = useIntl();
  const tvl = product?.tvl;
  const tvlValue = formatTurnover(tvl, { maxDecimals: 2 });
  const date = product?.tvlDate;
  const dateString = dayjs(date).format('YYYY-MM-DD');
  if (!tvl) return null;

  const poolName = useMemo(() => {
    if (product?.poolUrl.includes('raydium')) {
      return 'Raydium';
    }
    if (product?.poolUrl.includes('uniswap')) {
      return 'Uniswap V3';
    }
    return '';
  }, [product?.poolUrl]);

  const title = intl.turboRange.total_value_locked_of_raydium.replace(
    '{Raydium}',
    poolName
  );

  return (
    <StyledTvl>
      <div className="item-title" style={{ marginTop: '25px' }}>
        {title}
      </div>
      <div className="tvl-value">
        {intl.turboRange.XX_as_of_DATE.replace('{XX}', `$${tvlValue}`).replace(
          '{DATE}',
          dateString
        )}
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
