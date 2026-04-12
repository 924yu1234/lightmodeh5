import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import DGLogo from '../DeGate App logo@2x.png';
import step2 from '../Image Download DeGate@3x.png';
import step1 from '../Image Download TestFlight@3x.png';

export default function Testflight() {
  const intl = useIntl();

  const openTestflight = () => {
    WindowOpen('https://apps.apple.com/cn/app/testflight/id899247664');
  };

  const downloadDeGate = () => {};

  return (
    <StyledTestflight>
      <img src={DGLogo} alt="DeGate" className="dg-logo" />
      <div className="title">{intl.how_to_install_beta_version}</div>
      <div className="step">1</div>
      <div className="step-title">
        {intl.download_testflight_from_app_store}
      </div>
      <PrimaryBtn
        eventName="btn_download_testflight"
        className="step-btn"
        onClick={openTestflight}
      >
        {intl.click_to_download_testflight}
      </PrimaryBtn>
      <div className="step-desc">
        {intl.come_back_for_next_step_after_testflight_is_installed}
      </div>
      <img src={step1} alt="step1" className="step-img" />

      <div className="step" style={{ marginTop: 50 }}>
        2
      </div>
      <div className="step-title">{intl.download_DeGate_in_testflight}</div>
      <PrimaryBtn
        eventName="btn_download_DeGate"
        className="step-btn"
        onClick={downloadDeGate}
      >
        {intl.click_to_download_DeGate}
      </PrimaryBtn>

      <div className="step" style={{ marginTop: 50 }}>
        3
      </div>
      <div className="step-title">{intl.click_install}</div>
      <img src={step2} alt="step2" className="step-img" />
    </StyledTestflight>
  );
}

const StyledTestflight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 30px;

  .dg-logo {
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
  }

  .title {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-bottom: 50px;
  }

  .step {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    font-size: 20px;
    line-height: 28px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: ${({ theme }: { theme: ThemeType }) => theme.blue};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .step-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    line-height: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-bottom: 20px;
  }

  .dg-primary.mantine-Button-root {
    margin-bottom: 20px;
    width: 100%;
    height: 44px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  }

  .step-desc {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    margin-bottom: 20px;
  }

  .step-img {
    width: 100%;
    margin-bottom: 20px;
  }
`;
