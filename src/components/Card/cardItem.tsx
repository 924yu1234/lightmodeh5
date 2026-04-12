import React, { useMemo } from 'react';
import bg from 'imgs/card/card_web.png';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

import { getCardValue } from './utils';

export default function CardItem({
  cardId,
  size = 360,
}: {
  cardId: string;
  size: number;
}) {
  // const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const cardValue = useMemo(() => {
    return getCardValue(cardId);
  }, [cardId]);
  return (
    <StyledCardItem className="card-item" size={size}>
      <div className="card-value">${cardValue}</div>
      <div className="card-number">No. {cardId}</div>
    </StyledCardItem>
  );
}

const StyledCardItem = styled.div<{ size: number }>`
  width: ${({ size }: { size: number }) => size}px;
  height: ${({ size }: { size: number }) => size * 0.7979}px;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  .card-value {
    position: absolute;
    top: ${({ size }: { size: number }) => (40 * size) / 360}px;
    left: 40px;
    font-size: 40px;
    line-height: 40px;
    color: ${({ theme }) => theme.t_fff};
    ${({ theme }: { theme: ThemeType }) => theme.fontSFProMedium};
  }

  .card-number {
    position: absolute;
    top: ${({ size }: { size: number }) => (180 * size) / 360}px;
    right: 30px;
    font-size: 14px;
    line-height: 14px;
    color: ${({ theme }) => theme.t_fff};
    ${({ theme }: { theme: ThemeType }) => theme.fontSFProMedium};
  }
`;
