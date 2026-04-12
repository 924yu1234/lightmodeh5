import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import usePrivateClientDeskContacts from 'src/components/PrivateClientDesk/usePrivateClientDeskContacts';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

import IconPrivateClientDeskVipAni from './privateClientDeskVipAni';

export default function PrivateClientDeskEntry() {
  const intl = useIntl();
  const privateClientDeskContacts = usePrivateClientDeskContacts();
  const hideFloatingEntry = useUserFlag('private_client_desk_float_hidden');
  const hideFloatingEntryText = useUserFlag(
    'private_client_desk_float_text_hidden'
  );
  const updateHideFloatingEntryText = useChangeFlag(
    'private_client_desk_float_text_hidden'
  );
  const showModal = useShowModal();
  const shouldShow = useMemo(() => {
    return Boolean(privateClientDeskContacts?.hasConfig) && !hideFloatingEntry;
  }, [hideFloatingEntry, privateClientDeskContacts?.hasConfig]);

  const handleOpenPrivateClientDesk = useCallback(() => {
    showModal({
      modal: ModalKeys.privateClientDesk,
      showHideEntryBtn: true,
    });
  }, [showModal]);

  if (!shouldShow) {
    return null;
  }

  return (
    <StyledFloatingEntry
      className={`private-client-desk-entry ${
        !hideFloatingEntryText ? 'show-text' : ''
      }`}
      onClick={() => {
        handleOpenPrivateClientDesk();
        updateHideFloatingEntryText(true);
      }}
    >
      <IconPrivateClientDeskVipAni size={30} />
      {!hideFloatingEntryText && (
        <span className="label">{intl.private_client_desk_upperCase}</span>
      )}
    </StyledFloatingEntry>
  );
}

const StyledFloatingEntry = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) => theme.border_white_20};
  border-radius: 23px;
  background: #000;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  cursor: pointer;
  box-shadow: 0 6px 18px
    ${({ theme }: { theme: ThemeType }) => theme.bg_black_50};

  .label {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    font-size: 14px;
    line-height: 16px;
    white-space: nowrap;
  }

  &.show-text {
    padding: 6px 15px;
  }
`;
