import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatUsd } from 'src/utils/format';
import { multiply, plus } from 'src/utils/numberUtils';

import { useDualIncrease } from './dataProvider';

export default function ActiveCapital() {
  const intl = useIntl();
  const { position, quoteAmount, baseAmount, product } = useDualIncrease();

  const principalValue = position?.principalValue;
  const increaseValue = useMemo(() => {
    const baseToQuote = multiply(baseAmount || '0', product?.currentPrice || 0);
    return plus(quoteAmount || '0', baseToQuote);
  }, [baseAmount, quoteAmount, product?.currentPrice]);

  const newValue = plus(principalValue, increaseValue);

  return (
    <StyledActiveCapital>
      <div className="item-title">{intl.turboRange.active_capital}</div>
      <div className="capitals">
        <div className="capitals-item">{position?.principalValue_display}</div>
        <div className="arrow">→</div>
        <div
          className={`capitals-item ${
            Number(newValue) > Number(principalValue) ? 'color-green' : ''
          }`}
        >
          {formatUsd(newValue)}
        </div>
      </div>
    </StyledActiveCapital>
  );
}

const StyledActiveCapital = styled.div`
  margin-top: 30px;

  .capitals {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 10px;

    .arrow {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 18px;
      line-height: 20px;
    }

    .capitals-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: ${({ theme }) => theme.bg_white_10};
      border-radius: 5px;
      padding: 10px;
      min-height: 50px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 16px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 30px;
    }
  }
`;
