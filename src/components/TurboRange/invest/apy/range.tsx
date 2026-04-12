import React from 'react';
import styled from 'styled-components';

import IconInfo from 'src/components/Icons/info';
import IconRightOutlined from 'src/components/Icons/RightOutlined';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useTurboRangeProductName } from 'src/state/turboRange/hooks';
import { ThemeType, useThemeParams } from 'src/theme';

import { useApyContext } from '../apyProvider';

export default function Range() {
  const intl = useIntl();
  const { product, minPrice, maxPrice, setPrice, aprType } = useApyContext();
  const showModal = useShowModal();
  const { isMobile } = useThemeParams();
  const productName = useTurboRangeProductName(product.poolAddress);

  return (
    <StyledRange className="range">
      <div className="item-title">{intl.turboRange.price_range}</div>
      <div
        className="tips-desc cursor-pointer"
        onClick={() => {
          showModal({
            modal: ModalKeys.turboRangeFAQ,
            initQ: 'faq_2',
          });
        }}
      >
        {intl.turboRange.earn_yield_while_TSLA_price_stays_in_your_range.replace(
          '{TSLA}',
          productName || ''
        )}
        <IconInfo />
      </div>
      <div
        className="ranges"
        onClick={() => {
          if (!product?.currentPrice) return;
          showModal({
            modal: isMobile
              ? ModalKeys.turboRangeSetPriceRange
              : ModalKeys.turboRangeSetPriceRangeWEB,
            currentPrice: product.currentPrice,
            showDecimals: product.showDecimals,
            percent_min: product.percent_min,
            percent_max: product.percent_max,
            minPrice,
            maxPrice,
            product,
            aprType,
            onChange: ({ minPrice, maxPrice }: any) => {
              setPrice({ minPrice, maxPrice });
            },
          });
        }}
      >
        {minPrice} - {maxPrice} <IconRightOutlined />
      </div>
    </StyledRange>
  );
}

const StyledRange = styled.div`
  margin-top: 30px;

  .item-title {
    margin-bottom: 4px;
  }

  .tips-desc {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 15px;
    padding-right: 10px;

    .icon-info {
      margin-left: 5px;
      vertical-align: middle;
    }
  }

  .tips-desc {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 10px;
    padding-right: 10px;

    .icon-info {
      margin-left: 5px;
      vertical-align: middle;
    }
  }

  .ranges {
    display: flex;
    align-items: center;
    gap: 5px;
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 5px;
    height: 50px;
    padding: 0 10px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.border_transparent};
    .icon-right-outlined {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      font-size: 12px;
      margin-left: auto;
    }
    @media (hover: hover) {
      &:active {
        border: 1px solid ${({ theme }) => theme.border_blue};
      }
    }
  }
`;
