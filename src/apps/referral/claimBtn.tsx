import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import { ModalKeys } from 'src/state/application/reducer';
import message from 'src/utils/message';

import { useIntl } from 'js/locals';
import { useShowModal } from 'js/state/application/hooks';

import BtnWrapper from '../../components/BtnWrapper';

export default function ClaimReferralBtn({
  temporary_unclaimable,
  data,
  disabled,
  refreshList,
}: {
  temporary_unclaimable?: boolean;
  data: any;
  disabled?: boolean;
  refreshList?: () => void;
}) {
  const intl = useIntl();
  const showModal = useShowModal();

  const claim = () => {
    if (temporary_unclaimable) {
      message.warning(intl.Coming_soon);
      return;
    }
    showModal({ modal: ModalKeys.kol_claim, data, onHide: refreshList });
  };

  return (
    <StyledBtn source="">
      <PrimaryBtn
        eventName="btn_claim_referral"
        className="small"
        disabled={disabled}
        onClick={claim}
      >
        {intl['mining.claim']}
      </PrimaryBtn>
    </StyledBtn>
  );
}

const StyledBtn = styled(BtnWrapper)`
  .retrieve-link {
  }
`;
