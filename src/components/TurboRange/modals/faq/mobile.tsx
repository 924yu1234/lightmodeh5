import React from 'react';
import styled from 'styled-components';

import IconFaq2 from 'src/components/Icons/faq2';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';

export default function FAQMobile() {
  const intl = useIntl();
  const showModal = useShowModal();

  return (
    <>
      <StyledTips
        className="about-turbo-range"
        onClick={() => {
          showModal({ modal: ModalKeys.turboRangeFAQ });
        }}
      >
        <IconFaq2 size={16} />
        {intl.FAQ}
      </StyledTips>
    </>
  );
}

const StyledTips = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.t_000};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  color: ${({ theme }) => theme.blue};
  .icon-tips {
    color: ${({ theme }) => theme.blue};
  }
`;
