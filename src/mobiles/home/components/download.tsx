import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import IconDG from 'src/components/Icons/DG';
import IconWrapper from 'src/components/Icons/IconWrapper';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useShowMHomeDownloadBanner } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

export default function HomeDownload() {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const { close } = useShowMHomeDownloadBanner();

  return (
    <StyledDownload>
      <div className="download-inner">
        <div className="download-link">
          <IconDG size={24} />
          {intl.get_DeGate_app_now}
        </div>
        <PrimaryBtn
          eventName="btn_home_download_app"
          onClick={() => {
            navigate('/download');
          }}
        >
          {intl.download_app_get}
        </PrimaryBtn>
        <IconWrapper
          size={32}
          className="close-wrapper"
          onClick={() => {
            close();
          }}
        >
          <Close size={12} />
        </IconWrapper>
      </div>
    </StyledDownload>
  );
}

const StyledDownload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  background: ${({ theme }) => theme.bg_black};
  .download-inner {
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_40};
    width: 100%;
    height: 44px;
    display: flex;
    padding: 0 5px 0 15px;
    align-items: center;
    justify-content: flex-start;
    .dg-primary {
      height: 30px;
      margin: 0 5px 0 auto;
    }
    .download-link {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 14px;
      display: flex;
      flex: 1;
      height: 100%;
      align-items: center;
      justify-content: flex-start;
      gap: 5px;
    }
  }
`;
