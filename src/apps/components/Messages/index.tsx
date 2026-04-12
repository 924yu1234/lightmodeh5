import React from 'react';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import MessagesInner from 'src/components/Messages';
import MessagesEntrance from 'src/components/Messages/entrance';
import { useRegister, useSignToView } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';

const Dropdown = Menu.Dropdown;

export default function Messages() {
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
    <Menu width={460} trigger="click" offset={9} position="bottom-end">
      <Menu.Target>
        <div>
          <MessagesEntrance />
        </div>
      </Menu.Target>
      <StyledDropdown>
        <MessagesInner popupHeight={350} />
      </StyledDropdown>
    </Menu>
  );
}

const StyledDropdown = styled(Dropdown)`
  right: 15px !important;
  left: auto !important;
`;
