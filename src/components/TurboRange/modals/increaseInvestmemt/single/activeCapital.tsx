import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatUsd } from 'src/utils/format';
import { plus } from 'src/utils/numberUtils';

import { useIncrease } from './dataProvider';

export default function ActiveCapital() {
  const intl = useIntl();
  const { position, amount } = useIncrease();
  const principalValue = position?.principalValue;
  const newValue = plus(principalValue, amount || '0');
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
      padding: 10px 10px;
      min-height: 50px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 16px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 30px;
    }
  }
`;
