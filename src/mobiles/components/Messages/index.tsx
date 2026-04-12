import React from 'react';
import styled from 'styled-components';

import { Drawer } from 'src/UI';

import MessagesInner from 'src/components/Messages';
import MessagesEntrance from 'src/components/Messages/entrance';
import useWindowSize from 'src/hooks/useWindowSize';
import {
  useModals,
  useRegister,
  useShowModal,
  useSignToView,
} from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useDexAccount } from 'src/state/dexAccount/hooks';

export default function Messages() {
  const { height } = useWindowSize();
  const { visible, hide } = useModals(ModalKeys.m_messages);
  const popupHeight = Math.ceil(height - 52) || 400;
  const showModal = useShowModal();
  const { hasAccessToken, account, hasSyncDA } = useDexAccount();
  const signToView = useSignToView();
  const register = useRegister();

  if (!account) return null;

  if (!hasSyncDA) {
    return (
      <div
        onClick={() => {
          register({ source: 'notification' });
        }}
      >
        <MessagesEntrance />
      </div>
    );
  }

  if (!hasAccessToken) {
    return (
      <div onClick={signToView}>
        <MessagesEntrance />
      </div>
    );
  }

  return (
    <>
      <StyledChoosePair
        onClick={() => {
          showModal({ modal: ModalKeys.m_messages });
        }}
      >
        <MessagesEntrance />
      </StyledChoosePair>
      <Drawer
        opened={visible}
        withCloseButton={false}
        onClose={hide}
        position="bottom"
      >
        <StyledPop className="choose-pair-pop">
          <MessagesInner popupHeight={popupHeight} hide={hide} />
        </StyledPop>
      </Drawer>
    </>
  );
}

const StyledChoosePair = styled.div`
  display: flex;
  align-items: center;
  .icon-arrows {
    margin-left: 5px;
  }
`;

const StyledPop = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 10px;
  background: ${(props) => props.theme.modalBg};
  box-shadow: ${(props) => props.theme.boxShadow};
`;
