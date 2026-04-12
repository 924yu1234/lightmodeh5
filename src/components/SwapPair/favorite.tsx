import React from 'react';
import styled from 'styled-components';

import { FloatingPosition } from 'src/UI';

import useMessage from 'src/providers/useMessage';
import {
  useAddFavoriteSwapPair,
  useIsInFavoriteSwapPairs,
  useRemoveFavoriteSwapPair,
} from 'src/state/swap/pairs/hooks';

import { useIntl } from 'js/locals';

import IconFavorite from '../Icons/favorite';
import IconWrapper from '../Icons/IconWrapper';

export default function SwapPairFavorite({
  pair,
  size = 22,
  outSize,
  position,
  showTooltip = true,
}: {
  pair: any;
  size: number;
  outSize: number;
  position: FloatingPosition;
  showTooltip: boolean;
}) {
  const addFavorite = useAddFavoriteSwapPair();
  const removeFavorite = useRemoveFavoriteSwapPair();
  const favorite = useIsInFavoriteSwapPairs({ pairId: pair?.pairId });
  const intl = useIntl();
  const message = useMessage();

  let title;
  if (showTooltip) {
    title = favorite ? intl.remove_favorite_tooltip : intl.add_favorite_tooltip;
  }
  return (
    <StyledPairFavorite
      className="pair-favorite"
      size={size}
      onClick={(e) => {
        e.stopPropagation();
        if (favorite) {
          removeFavorite({ pair });
          message.success(intl.removed_to_favorites);
        } else {
          message.success(intl.added_to_favorites);
          addFavorite({ pair });
        }
      }}
    >
      <IconWrapper
        showHoverBG
        title={title}
        size={outSize}
        titlePosition={position}
      >
        <IconFavorite size={size} className={favorite ? 'active' : ''} />
      </IconWrapper>
    </StyledPairFavorite>
  );
}

export const StyledPairFavorite = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .pair-favorite-icon {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
`;
