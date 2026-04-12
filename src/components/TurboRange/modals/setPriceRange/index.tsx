import React from 'react';
import styled from 'styled-components';

import BottomModal from 'src/components/Modals/bottomModal';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import SetPriceRangeInner, {
  commonStyledSetPriceRangeModal,
  SetPriceRangeInnerRef,
} from './inner';

export default function SetPriceRangeModal() {
  const {
    visible,
    hide,
    currentPrice,
    showDecimals,
    minPrice: minPriceProps,
    maxPrice: maxPriceProps,
    onChange,
    product,
    aprType,
  } = useModals(ModalKeys.turboRangeSetPriceRange);
  const innerRef = React.useRef<SetPriceRangeInnerRef>(null);
  const intl = useIntl();

  return (
    <BottomModal
      onClose={() => {
        innerRef.current?.closeModal();
      }}
      opened={visible}
      className="full-modal"
    >
      <StyledSetPriceRangeModal className="modal-wrapper">
        <div className="modal-title">{intl.turboRange.set_price_range}</div>
        <div className="modal-content">
          <SetPriceRangeInner
            visible={visible}
            ref={innerRef}
            currentPrice={currentPrice}
            showDecimals={showDecimals}
            minPriceProps={minPriceProps}
            maxPriceProps={maxPriceProps}
            onChange={onChange}
            product={product}
            aprType={aprType}
            onClose={hide}
          />
        </div>
      </StyledSetPriceRangeModal>
    </BottomModal>
  );
}

const StyledSetPriceRangeModal = styled.div`
  .modal-content {
    width: 100%;
    max-height: ${({ theme }: { theme: ThemeType }) => {
      if (theme.isMobile) {
        return theme.windowHeight - theme.modalTop - 100;
      }
      return theme.windowHeight - theme.modalTop - 150;
    }}px;
    overflow: auto;
    height: 100%;
  }

  ${commonStyledSetPriceRangeModal}
`;
