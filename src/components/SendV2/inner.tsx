import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

import Close from '../Icons/close';
import IconMobileBack from '../Icons/mobileBack';
import SendV2Address from './address';
import SendV2Amount from './amount';
import SendV2ChooseToken from './chooseToken';
import SendV2ChooseUsdc from './chooseUsdc';
import { useSendV2Data } from './sendDataProvider';

export default function SendV2Inner() {
  const { hide } = useModals(ModalKeys.sendV2);
  const intl = useIntl();

  const { page, setPage, token } = useSendV2Data();

  const hideModal = () => {
    hide();
  };

  const goBack = () => {
    if (page === 'address') {
      setPage('token');
    } else if (page === 'fungibleUsdc') {
      setPage('token');
    } else if (page === 'amout') {
      setPage('address');
    } else {
      hide();
    }
  };

  return (
    <StyledSendV2 className="modal-wrapper">
      <div className="modal-title">
        <IconMobileBack onClick={goBack} />
        {page === 'token' && intl.Select_Token}
        {page === 'fungibleUsdc' && intl.Select_Token}
        {page === 'address' && intl['m.to_address']}
        {page === 'amout' && `${intl.Send} ${token?.symbol}`}
        <Close onClick={hideModal} />
      </div>
      <div className="modal-content" style={{ padding: 0 }}>
        {page === 'token' && <SendV2ChooseToken />}
        {page === 'fungibleUsdc' && <SendV2ChooseUsdc />}
        {page === 'address' && <SendV2Address />}
        {page === 'amout' && <SendV2Amount />}
      </div>
    </StyledSendV2>
  );
}

const StyledSendV2 = styled.div`
  .send-btn {
    width: 100%;
    min-height: 46px;
  }
`;
