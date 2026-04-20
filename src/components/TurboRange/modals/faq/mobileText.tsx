import React from 'react';
import styled from 'styled-components';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import IconTips from 'src/components/Icons/tips';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

/** “How does Turbo Range earn yield?” — H5 spec: mint panel, green info icon, ink title, soft green chevron. */
export default function FAQMobileText() {
  const intl = useIntl();
  const showModal = useShowModal();
  const isHide = useUserFlag('m_turbo_range_faq_hide');
  const setIsHide = useChangeFlag('m_turbo_range_faq_hide');
  if (isHide) {
    return null;
  }
  return (
    <StyledTips className="about-turbo-range">
      <div
        className="inner-label"
        onClick={() => {
          showModal({ modal: ModalKeys.turboRangeFAQ, initQ: 'faq_2' });
          setIsHide(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showModal({ modal: ModalKeys.turboRangeFAQ, initQ: 'faq_2' });
            setIsHide(true);
          }
        }}
      >
        <IconTips size={16} className="yield-tip-icon" />
        <span className="yield-copy">
          {intl.turboRange.how_does_turbo_range_earn_yield}
        </span>
        <IconRightOutlined size={14} className="yield-chevron" />
      </div>
    </StyledTips>
  );
}

const StyledTips = styled.div`
  margin-top: 12px;
  border-radius: 10px;
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.border_white_05 : theme.infoBarBorder};
  background: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.bg_white_05 : theme.bg_buy_10};
  box-shadow: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
  min-height: 48px;
  padding: 12px 14px;
  line-height: 20px;
  position: relative;
  z-index: 1;
  width: 100%;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    background-color 0.18s ease, border-color 0.18s ease;

  &:active {
    transform: scale(0.995);
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.bg_white_10 : theme.infoBarBg};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:active {
      transform: none;
    }
  }

  .inner-label {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff : theme.ink};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    outline: none;
  }

  .inner-label:focus-visible {
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.ctaGhostFocusRing};
    border-radius: 8px;
  }

  .yield-tip-icon {
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
    flex-shrink: 0;
  }

  .yield-copy {
    flex: 1;
    min-width: 0;
    text-align: left;
  }

  .yield-chevron {
    flex-shrink: 0;
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.green : theme.accentDark};
  }
`;
