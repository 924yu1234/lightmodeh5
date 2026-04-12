import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import SetPriceRangeInner, {
  commonStyledSetPriceRangeModal,
  SetPriceRangeInnerRef,
} from './inner';

export interface SetPriceRangeModalWEBRef {
  closeModal: () => void;
}

const SetPriceRangeModalWEB = forwardRef<SetPriceRangeModalWEBRef>(
  function SetPriceRangeModalWEB(_, ref) {
    const innerRef = React.useRef<SetPriceRangeInnerRef>(null);
    const {
      hide,
      currentPrice,
      showDecimals,
      minPrice: minPriceProps,
      maxPrice: maxPriceProps,
      onChange,
      product,
      aprType,
    } = useModals(ModalKeys.turboRangeSetPriceRangeWEB);

    useImperativeHandle(ref, () => ({
      closeModal: () => {
        innerRef.current?.closeModal();
      },
    }));

    return (
      <StyledSetPriceRangeModal className="modal-wrapper">
        <div className="modal-content">
          <SetPriceRangeInner
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
    );
  }
);

export default SetPriceRangeModalWEB;

const StyledSetPriceRangeModal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .modal-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding: 0 10px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 20px;
    line-height: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }

  .modal-content {
    width: 100%;
    padding: 0 30px 30px;
  }

  ${commonStyledSetPriceRangeModal}
`;
