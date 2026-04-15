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
  .youtube-player-shell,
  .video-poster,
  .video-poster-image {
    width: 100%;
    height: 100%;
    display: block;
  }

  .youtube-player-shell iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
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

  &.is-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    border-radius: 0;
    border: none;
    margin: 0;
    background: #000;
    aspect-ratio: auto;
  }

  .overlay-close {
    right: 16px;
    top: 16px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.14);
    z-index: 1;

    .close-icon {
      width: 16px;
      height: 16px;
      position: relative;
      display: block;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 2px;
        background: #fff;
        border-radius: 1px;
      }

      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  @media (hover: hover) {
    .video-play:hover {
      background: #ffffff;
    }

    .video-fullscreen:hover {
      background: rgba(15, 23, 40, 0.88);
    }

    .overlay-close:hover {
      background: rgba(255, 255, 255, 0.24);
    }
  }
`;

export const StyledLandscapeOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(6, 10, 18, 0.96);
  padding: max(16px, env(safe-area-inset-top))
    max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom))
    max(16px, env(safe-area-inset-left));
  box-sizing: border-box;

  .landscape-close {
    position: absolute;
    top: max(16px, env(safe-area-inset-top));
    left: max(16px, env(safe-area-inset-left));
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
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 56px 0 24px;
    box-sizing: border-box;
  }

  .landscape-player {
    width: min(100%, calc((100vh - 136px) * 16 / 9));
    max-height: calc(100vh - 136px);
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
