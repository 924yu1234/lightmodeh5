import React from 'react';
import styled from 'styled-components';

import IconFaq2 from 'src/components/Icons/faq2';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType, useThemeParams } from 'src/theme';

export default function FAQWeb() {
  const intl = useIntl();
  const showModal = useShowModal();
  const { isMobile } = useThemeParams();

  return (
    <>
      <StyledTips
        className="about-turbo-range"
        onClick={() => {
          showModal({ modal: ModalKeys.turboRangeFAQ });
        }}
      >
        {!isMobile && <IconFaq2 />}
        {intl.FAQ}
      </StyledTips>
    </>
  );
}

const StyledTips = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.bg_white_10 : theme.shellSurfaceSecondary};
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'transparent' : theme.innerBorder};
  border-radius: 23px;
  min-width: 80px;
  padding: 0 15px;
  min-height: 34px;
  height: 100%;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.blue};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  .icon-faq {
    color: ${({ theme }) => theme.blue};
  }
`;
