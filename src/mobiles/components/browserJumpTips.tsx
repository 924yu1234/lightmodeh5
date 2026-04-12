import React from 'react';
import styled from 'styled-components';

import IconGuideArrow from 'src/components/Icons/guideArrow';
import { useIntl } from 'src/locals';
import { useInfo } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

export default function BrowserJumpTips() {
  const intl = useIntl();
  return (
    <StyledBrowserJumpTips className="guide-mask">
      <IconGuideArrow className="guide-arrow" />
      <div className="guide-tips">
        {intl.select_Open_in_Default_Browser_from_the_menu}
      </div>
    </StyledBrowserJumpTips>
  );
}

export const StyledBrowserJumpTips = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_black_50};
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
  .guide-arrow {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .guide-tips {
    position: absolute;
    top: 58px;
    right: 58px;
    background: ${({ theme }) => theme.modalBg};
    border: 1px dashed ${(props) => props.theme.border_white_50};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 10px 20px;
    max-width: ${({ theme }: { theme: ThemeType }) => theme.viewWidth - 100}px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    text-align: left;
  }
`;

export const useNeedJumpOut = () => {
  const ua = navigator.userAgent.toLowerCase();
  const { JumpOutBrowser } = useInfo();
  return new RegExp(JumpOutBrowser).test(ua);
};
