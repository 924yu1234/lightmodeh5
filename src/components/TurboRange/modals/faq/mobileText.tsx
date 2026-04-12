import React from 'react';
import styled from 'styled-components';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import IconTips from 'src/components/Icons/tips';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

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
      >
        <IconTips size={15} />
        {intl.turboRange.how_does_turbo_range_earn_yield}
        <IconRightOutlined size={13} />
      </div>
    </StyledTips>
  );
}

const StyledTips = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bg_white_05};
  border-radius: 5px;
  min-height: 44px;
  margin-top: 10px;
  padding: 12px 20px 12px;
  line-height: 20px;
  position: relative;
  z-index: 1;
  width: 100%;
  .inner-label {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 13px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    width: 100%;
  }
  .icon-right-outlined {
    margin-left: auto;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
`;
