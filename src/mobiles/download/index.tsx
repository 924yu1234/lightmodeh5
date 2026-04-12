import React, { useCallback, useEffect, useMemo } from 'react';
import logo from 'imgs/downloadPage/degate.svg';
import taglineMobile from 'imgs/downloadPage/tagline_mobile.svg';
import taglineWeb from 'imgs/downloadPage/tagline_web.svg';
import { isIOS, isMacOs, isMobile } from 'react-device-detect';
import styled from 'styled-components';

import { UIButton } from 'src/UI';

import {
  ApkIcon,
  GooglePlayIcon,
  IOSIcon,
} from 'src/components/Icons/downloadPage';
import { useOneLinkSmartScript } from 'src/hooks/useOneLinkSmartScript';
import { useIntl } from 'src/locals';
import { useUtmSource } from 'src/providers/useWallet';
import { useInfo } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';
import { logger } from 'src/utils/logger';
import WindowOpen from 'src/utils/windowOpen';

import PartnersSection from './PartnersSection';

export default function Download() {
  const intl = useIntl();
  const { androidAPK } = useInfo();
  const utmSource = useUtmSource();
  // Check if current domain is trade.degate.com - skip OneLink if so
  const isTradeDomain = window.location.hostname.startsWith('trade.degate.com');

  // Use OneLink Smart Script to generate dynamic URL with QR code support
  const { clickURL, displayQrCode } = useOneLinkSmartScript({
    oneLinkURL: 'https://degate.onelink.me/sjZL',
    afParameters: {
      mediaSource: {
        keys: ['utm_source'],
        defaultValue: utmSource ? `official_${utmSource}` : 'official_web',
      },
      afCustom: [
        {
          paramKey: 'af_ss_ui',
          defaultValue: 'true',
        },
      ],
    },
    autoGenerate: true,
  });

  // Generate QR code when URL is available and on desktop
  useEffect(() => {
    // Check if container exists and is empty (no QR code rendered yet)
    const container = document.getElementById('qr-code-container');
    const hasQrCode = container && container.children.length > 0;

    if (clickURL && !isMobile && !hasQrCode) {
      try {
        displayQrCode('qr-code-container', {
          codeColor: '#000',
        });

        // Check if QR code was actually rendered
        setTimeout(() => {
          const containerAfter = document.getElementById('qr-code-container');
          const success = containerAfter && containerAfter.children.length > 0;
          if (success) {
            logger.log('QR code generated successfully');
          }
        }, 100);
      } catch (error) {
        logger.log('Failed to generate QR code:', error);
      }
    }
  }, [clickURL, displayQrCode]);

  // Generate platform-specific URLs
  const { iosUrl, androidUrl } = useMemo(() => {
    const utmSourceStr = utmSource ? `official_${utmSource}` : 'official';
    return {
      iosUrl: `https://apps.apple.com/app/apple-store/id6742168343?pt=127643354&ct=${utmSourceStr}&mt=8`,
      androidUrl: `https://play.google.com/store/apps/details?id=com.app.degate&referrer=${encodeURIComponent(
        `utm_source=${utmSourceStr}`
      )}`,
    };
  }, [utmSource]);

  // Determine which URL to use based on platform and device
  const getDownloadUrl = useCallback(
    (platform: 'ios' | 'android') => {
      // For trade.degate.com domain: always use direct platform URLs
      if (isTradeDomain) {
        logger.log('Trade domain: Using direct URL');
        return platform === 'ios' ? iosUrl : androidUrl;
      }

      // On mobile: always use OneLink URL if available
      if (isMobile && clickURL) {
        logger.log('Mobile device: Using OneLink URL:', clickURL);
        return clickURL;
      }

      // On desktop: use direct platform URLs
      logger.log('Desktop device: Using direct URL');
      return platform === 'ios' ? iosUrl : androidUrl;
    },
    [clickURL, iosUrl, androidUrl, isTradeDomain]
  );

  // Download handlers
  const downloadIOS = useCallback(() => {
    const url = getDownloadUrl('ios');
    if (url) {
      WindowOpen(url, '_blank');
    }
  }, [getDownloadUrl]);

  const downloadAndroid = useCallback(() => {
    const url = getDownloadUrl('android');
    if (url) {
      WindowOpen(url, '_blank');
    }
  }, [getDownloadUrl]);

  const downloadApk = useCallback(() => {
    if (typeof androidAPK === 'string') {
      WindowOpen(androidAPK, '_blank');
    } else if (Array.isArray(androidAPK)) {
      WindowOpen(androidAPK?.[0], '_blank');
    }
  }, [androidAPK]);

  // Get button text based on current platform (for mobile)
  const buttonText = useMemo(() => {
    if (isMobile) {
      if (isIOS || isMacOs) {
        return intl.download_page_app_store;
      }
      return intl.download_page_google_play;
    }
    return null; // Desktop shows both buttons
  }, [intl]);

  return (
    <StyledDownload>
      {/* Background gradient circles */}
      <div className="gradient-bg">
        <div className="circle circle-blue" />
        <div className="circle circle-green" />
        <div className="circle circle-blue-2" />
      </div>

      {/* Main content */}
      <div className="content">
        {/* Logo section - only show on mobile */}
        {isMobile && (
          <div className="logo-section">
            <img src={logo} alt="DeGate" className="logo-image" />
          </div>
        )}

        {/* Title section */}
        <div className="title-section">
          <img
            src={isMobile ? taglineMobile : taglineWeb}
            alt="The Easy Way to Earn on Blockchains"
            className="tagline-image"
          />
        </div>

        {/* Download section */}
        <div className="download-section">
          {/* Buttons column */}
          <div
            className={`buttons-column ${
              isMobile && (isIOS || isMacOs) ? 'single-btn' : ''
            }`}
          >
            {isMobile ? (
              // Mobile: Show single platform-specific button
              <>
                <div className="platform-label">
                  {isIOS || isMacOs ? 'iOS' : 'Android'}
                </div>
                <UIButton
                  eventName={`btn_download_${
                    isIOS || isMacOs ? 'ios' : 'android'
                  }`}
                  className="download-btn"
                  onClick={isIOS || isMacOs ? downloadIOS : downloadAndroid}
                >
                  {isIOS || isMacOs ? <IOSIcon /> : <GooglePlayIcon />}
                  {buttonText}
                </UIButton>
                {!(isIOS || isMacOs) && (
                  <UIButton
                    eventName="btn_download_apk"
                    className="download-btn"
                    onClick={downloadApk}
                  >
                    <ApkIcon />
                    {intl.download_apk}
                  </UIButton>
                )}
              </>
            ) : (
              // Desktop: Show all buttons
              <>
                <div className="platform-label">iOS</div>
                <UIButton
                  eventName="btn_download_ios"
                  className="download-btn"
                  onClick={downloadIOS}
                >
                  <IOSIcon />
                  {intl.download_page_app_store}
                </UIButton>

                <div className="platform-label android-label">Android</div>
                <UIButton
                  eventName="btn_download_android"
                  className="download-btn"
                  onClick={downloadAndroid}
                >
                  <GooglePlayIcon />
                  {intl.download_page_google_play}
                </UIButton>

                <UIButton
                  eventName="btn_download_apk"
                  className="download-btn"
                  onClick={downloadApk}
                >
                  <ApkIcon />
                  {intl.download_page_apk}
                </UIButton>
              </>
            )}
          </div>

          {/* QR Code column - only show on desktop */}
          {!isMobile && (
            <div className="qr-column">
              <div className="qr-label">
                {intl.download_page_scan_to_download}
              </div>
              <div id="qr-code-container" className="qr-code-wrapper" />
            </div>
          )}
        </div>

        {/* Partners section */}
        <PartnersSection />
      </div>
    </StyledDownload>
  );
}

const StyledDownload = styled.div`
  /* Base background */
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_05050d};
  min-height: 100vh;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 104px 20px;

  /* Gradient circles background */
  .gradient-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;

    .circle {
      position: absolute;
      border-radius: 50%;
      /* Safari iOS can drop filtered layers when stacking contexts change; keep this on a stable composited layer. */
      -webkit-filter: blur(150px);
      filter: blur(150px);
      transform: translateZ(0);
    }

    .circle-blue {
      width: 800px;
      height: 800px;
      background: radial-gradient(
        circle,
        rgba(38, 61, 129, 1) 0%,
        rgba(38, 61, 129, 0.2) 40%,
        transparent 70%
      );
      top: -300px;
      left: -200px;
    }

    .circle-green {
      width: 700px;
      height: 700px;
      background: radial-gradient(
        circle,
        rgba(9, 30, 11, 1) 0%,
        transparent 100%
      );
      bottom: 250px;
      right: -200px;
    }

    .circle-blue-2 {
      width: 600px;
      height: 600px;
      background: radial-gradient(
        circle,
        rgba(38, 61, 129, 1) 0%,
        rgba(38, 61, 129, 0.15) 40%,
        transparent 70%
      );
      top: 50%;
      right: 5%;
      transform: translateY(-50%);
    }
  }

  /* Main content */
  .content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    @media (max-width: 768px) {
      padding: 156px 0 20px 0;
      justify-content: space-between;
    }
  }

  /* Logo section */
  .logo-section {
    padding: 20px 28px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      margin-bottom: 0;
      padding: 20px 20px;
      background: linear-gradient(
        180deg,
        #000000 17%,
        rgba(0, 0, 0, 0.07) 90%,
        rgba(0, 0, 0, 0) 100%
      );
    }

    .logo-image {
      width: 80px;
      height: auto;
    }
  }

  /* Title section */
  .title-section {
    text-align: center;
    margin-bottom: 80px;

    @media (max-width: 768px) {
      margin-bottom: 60px;
      flex: 0 0 auto;
    }

    .tagline-image {
      max-width: 100%;
      height: auto;
      width: 660px;

      @media (max-width: 768px) {
        width: 100%;
        max-width: 365px;
      }
    }
  }

  /* Download section */
  .download-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;

    @media (max-width: 1024px) {
      gap: 30px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
      flex: 0 0 auto;
    }
  }

  /* Buttons column */
  .buttons-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 240px;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 100%;
      gap: 12px;
    }

    &.single-btn .download-btn {
      justify-content: center;
    }

    .platform-label {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${({ theme }) => theme.t_fff};
      margin-bottom: 4px;
      margin-top: 0;
      text-align: center;

      @media (max-width: 768px) {
        display: none;
      }

      &.android-label {
        margin-top: 16px;
      }
    }

    .download-btn {
      width: 100%;
      height: 56px;
      background: ${({ theme }) => theme.bg_white};
      border: none;
      border-radius: 12px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 18px;
      color: ${({ theme }) => theme.t_000};
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding: 0 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      @media (max-width: 768px) {
        height: 48px;
        width: 100%;
        border-radius: 16px;
        font-size: 18px;
      }

      svg {
        flex-shrink: 0;
        margin-right: 9px;

        @media (max-width: 768px) {
          margin-right: 8px;
        }
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(74, 158, 255, 0.3);
        background: ${({ theme }: { theme: ThemeType }) => theme.bg_f0f8ff};
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  /* QR Code column */
  .qr-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .qr-label {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 16px;
      color: ${({ theme }) => theme.t_fff};
    }

    .qr-code-wrapper {
      width: 250px;
      height: 250px;
      background: ${({ theme }) => theme.bg_white};
      border-radius: 20px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

      canvas {
        width: 200px !important;
        height: 200px !important;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0px;

    .title-section {
      margin-bottom: 40px;
    }

    .buttons-column {
      width: 100%;
      max-width: 240px;
    }
  }
`;
