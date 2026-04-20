import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';

/** H5 header — green “FAQ” text link (Turbo Range H5 spec). */
export default function FAQMobile() {
  const intl = useIntl();
  const showModal = useShowModal();

  return (
    <StyledFaqLink
      type="button"
      className="about-turbo-range"
      onClick={() => {
        showModal({ modal: ModalKeys.turboRangeFAQ });
      }}
    >
      {intl.FAQ}
    </StyledFaqLink>
  );
}

const StyledFaqLink = styled.button`
  margin: 0;
  padding: 4px 2px;
  border: none;
  background: none;
  cursor: pointer;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  font-size: 15px;
  line-height: 22px;
  color: ${({ theme }: { theme: ThemeType }) => theme.green};
  transition: opacity 0.15s ease, color 0.15s ease;

  &:active {
    opacity: 0.82;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }: { theme: ThemeType }) => theme.accentDark};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
