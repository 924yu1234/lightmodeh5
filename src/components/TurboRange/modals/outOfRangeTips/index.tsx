import React, { useMemo } from 'react';
import styled from 'styled-components';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { ThemeType } from 'src/theme';

export default function OutOfRangeTips({
  position,
}: {
  position: TurboRangePosition;
}) {
  const intl = useIntl();
  const { minPrice, poolAddress } = position;
  const product = useTurboRangeProduct(poolAddress);
  const showTips = useMemo(() => {
    return Number(product.currentPrice) < Number(minPrice);
  }, [minPrice, product.currentPrice]);
  const showModal = useShowModal();
  const handleClick = () => {
    showModal({
      modal: ModalKeys.turboRangeOutOfRangeTips,
      product,
      position,
    });
  };
  if (!showTips || !product.currentPrice) return null;
  return (
    <StyledOutOfRangeTips className="out-of-range-tips" onClick={handleClick}>
      <div className="out-of-range-tips-inner">
        {intl.turboRange.price_is_out_of_range_see_tips}
        <IconRightOutlined />
      </div>
    </StyledOutOfRangeTips>
  );
}

const StyledOutOfRangeTips = styled.div`
  min-height: 50px;
  cursor: pointer;
  margin-bottom: 15px;
  padding: 15px;
  line-height: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 13px;
  background: ${({ theme }) => theme.bg_blue_10};
  border-radius: 5px;
  .out-of-range-tips-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
