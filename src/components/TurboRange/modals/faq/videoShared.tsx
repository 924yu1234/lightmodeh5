import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

export type FullscreenVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenDocument = Document & {
  webkitFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

export function canUseDocumentFullscreen() {
  if (typeof document === 'undefined') return false;

  const fullscreenDocument = document as FullscreenDocument;

  if (typeof fullscreenDocument.fullscreenEnabled === 'boolean') {
    return fullscreenDocument.fullscreenEnabled;
  }

  if (typeof fullscreenDocument.webkitFullscreenEnabled === 'boolean') {
    return fullscreenDocument.webkitFullscreenEnabled;
  }

  return false;
}

export function getFullscreenElement() {
  if (typeof document === 'undefined') return null;

  const fullscreenDocument = document as FullscreenDocument;

  return (
    fullscreenDocument.fullscreenElement ||
    fullscreenDocument.webkitFullscreenElement ||
    null
  );
}

export function exitDocumentFullscreen() {
  if (typeof document === 'undefined') return;

  const fullscreenDocument = document as FullscreenDocument;

  if (fullscreenDocument.exitFullscreen) {
    fullscreenDocument.exitFullscreen().catch(() => undefined);
    return;
  }

  if (fullscreenDocument.webkitExitFullscreen) {
    fullscreenDocument.webkitExitFullscreen();
  }
}

export const StyledVideoCard = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #0f1728;
  margin-bottom: 20px;
  aspect-ratio: 16 / 9;
  border: 1px solid ${({ theme }) => theme.border_white_10};

  video {
    width: 100%;
    height: 100%;
    display: block;
    background: #0f1728;
  }

  iframe,
  .video-poster,
  .video-poster-image {
    width: 100%;
    height: 100%;
    display: block;
  }

  iframe,
  .video-poster {
    border: 0;
    background: linear-gradient(
        180deg,
        rgba(27, 42, 73, 0.55),
        rgba(15, 23, 40, 0.92)
      ),
      radial-gradient(circle at top, rgba(0, 193, 255, 0.18), transparent 42%),
      #0f1728;
  }

  .video-poster-image {
    object-fit: cover;
    background: #0f1728;
  }

  .video-action {
    border: 0;
    padding: 0;
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .video-play {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.88);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);

    .play-icon {
      width: 0;
      height: 0;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      border-left: 18px solid ${({ theme }) => theme.bg_131a2a};
      margin-left: 4px;
    }

    &.has-started {
      width: 56px;
      height: 56px;

      .play-icon {
        border-top-width: 10px;
        border-bottom-width: 10px;
        border-left-width: 16px;
      }
    }
  }

  .video-fullscreen {
    right: 12px;
    top: 12px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(15, 23, 40, 0.72);
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    z-index: 1;

    .dg-icon {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }

  @media (hover: hover) {
    .video-play:hover {
      background: #ffffff;
    }

    .video-fullscreen:hover {
      background: rgba(15, 23, 40, 0.88);
    }
  }
`;

export const StyledLandscapeOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(6, 10, 18, 0.96);

  .landscape-close {
    position: absolute;
    top: 16px;
    left: 16px;
    min-width: 36px;
    height: 36px;
    border: 0;
    border-radius: 18px;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.14);
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    z-index: 2;
  }

  .landscape-close-label {
    font-size: 13px;
    line-height: 1;
    color: inherit;
  }

  .landscape-stage {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100vh;
    height: 100vw;
    transform: translate(-50%, -50%) rotate(90deg);
    transform-origin: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
    box-sizing: border-box;
  }

  .landscape-player {
    width: 100%;
    max-width: 100vh;
    aspect-ratio: 16 / 9;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  video,
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
    background: #000;
  }
`;
