import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import usePrivateClientDeskContacts from 'src/components/PrivateClientDesk/usePrivateClientDeskContacts';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

import IconPrivateClientDeskVipAni from './privateClientDeskVipAni';

export default function PrivateClientDeskFloatingEntryMobile() {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const privateClientDeskContacts = usePrivateClientDeskContacts();
  const hideFloatingEntry = useUserFlag('private_client_desk_float_hidden');
  const hideFloatingEntryText = useUserFlag(
    'private_client_desk_float_text_hidden'
  );
  const updateHideFloatingEntryText = useChangeFlag(
    'private_client_desk_float_text_hidden'
  );

  const shouldShow = useMemo(() => {
    return Boolean(privateClientDeskContacts?.hasConfig) && !hideFloatingEntry;
  }, [hideFloatingEntry, privateClientDeskContacts?.hasConfig]);

  const handleOpenPrivateClientDesk = useCallback(() => {
    navigate('/private-client-desk?from=fab');
  }, [navigate]);

  if (!shouldShow) {
    return null;
  }

  return (
    <StyledFloatingEntry
      className={`${!hideFloatingEntryText ? 'show-text' : ''}`}
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
  position: fixed;
  right: 20px;
  bottom: 30px;
  height: 46px;
  z-index: 30;
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
    right: 50%;
    transform: translateX(50%);
  }
`;
