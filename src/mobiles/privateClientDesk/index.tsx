import React, { useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import PrivateClientDeskContentMobile from 'src/components/PrivateClientDesk/content_m';
import { useShowH5Header } from 'src/h5/utils';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useSetTitle } from 'src/providers/useWallet';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

export default function PrivateClientDeskPage() {
  const intl = useIntl();
  const location = useLocation();
  const showH5Header = useShowH5Header();
  const setDocumentTitle = useSetTitle();
  const showModal = useShowModal();

  const fromFloatingEntry = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const source = (
      params.get('from') ||
      params.get('entry') ||
      ''
    ).toLowerCase();
    return source === 'fab' || source === 'floating' || source === 'float';
  }, [location.search]);

  useEffect(() => {
    setDocumentTitle(intl.private_client_desk);
    return () => {
      setDocumentTitle('');
    };
  }, [intl.private_client_desk, setDocumentTitle]);

  const handleClickHideEntryBtn = useCallback(() => {
    showModal({ modal: ModalKeys.privateClientDeskHideEntryConfirm });
  }, [showModal]);

  return (
    <StyledPrivateClientDeskPage>
      {showH5Header && <Header title={intl.private_client_desk} />}
      <div className="page-inner">
        <PrivateClientDeskContentMobile
          showHideEntryBtn={fromFloatingEntry}
          onClickHideEntryBtn={handleClickHideEntryBtn}
        />
      </div>
    </StyledPrivateClientDeskPage>
  );
}

const StyledPrivateClientDeskPage = styled.div`
  overflow: hidden;
  height: 100%;
  padding-top: ${({ theme }: { theme: ThemeType }) =>
    !theme.showH5Header ? 0 : 52}px;

  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    overscroll-behavior-y: contain;
    padding: 0 28px 30px;
  }
`;
