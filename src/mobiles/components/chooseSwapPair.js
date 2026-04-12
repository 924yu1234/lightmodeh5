import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Drawer } from 'src/UI';

import ChooseSwapPairPop from 'src/components/ChooseSwapPairPop';
import Close from 'src/components/Icons/close';
import { useIntl } from 'src/locals';

import ArrowDown from 'js/components/Icons/arrowDown';
import useWindowSize from 'js/hooks/useWindowSize';
import { useModals, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function MobileChooseSwapPair({ children, hideArrow }) {
  const showModal = useShowModal();
  const intl = useIntl();
  const { height } = useWindowSize();
  const { visible, hide } = useModals(ModalKeys.chooseSwapPair);
  const popupHeight = Math.ceil(height - 52) || 400;
  return (
    <>
      <StyledChooseSwapPair
        onClick={() => {
          showModal({ modal: ModalKeys.chooseSwapPair });
        }}
        className="m-choose-swap-pair-wrapper"
      >
        {children}
        {!hideArrow && <ArrowDown />}
      </StyledChooseSwapPair>
      <Drawer
        opened={visible}
        withCloseButton={false}
        onClose={hide}
        position="bottom"
        size={popupHeight}
        trapFocus={false}
      >
        <StyledPop className="choose-swap-pair-pop">
          {/* // 30 为底部预留空间 */}
          <div className="popup-title title">
            {intl['m.choose_pair']}
            <Close onClick={hide} />
          </div>
          <ChooseSwapPairPop isMobile popupHeight={popupHeight - 45 - 22} />
        </StyledPop>
      </Drawer>
    </>
  );
}

MobileChooseSwapPair.propTypes = {
  children: PropTypes.any,
  hideArrow: PropTypes.bool,
};

const StyledChooseSwapPair = styled.div`
  display: flex;
  align-items: center;
  .icon-arrows {
    margin-left: 5px;
  }
`;

const StyledPop = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 0 20px;
  background: ${(props) => props.theme.modalBg};
  box-shadow: ${(props) => props.theme.boxShadow};
  &.choose-swap-pair-pop .popup-title {
    padding: 0 15px;
    display: flex;
    align-items: center;
    ${(props) => props.theme.fontMedium};
    font-size: 16px;
    line-height: 20px;
    color: ${(props) => props.theme.t_b7b};
  }
  .choose-pair {
    background: none;
    box-shadow: none;
    width: 100%;
  }
`;
