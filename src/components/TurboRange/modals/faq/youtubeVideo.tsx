import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import Close from 'src/components/Icons/close';
import TvFullScreen from 'src/components/Icons/tv_fullScreen';
import { useIntl } from 'src/locals';
import { useIsAppH5 } from 'src/providers/useWallet';

import {
  canUseDocumentFullscreen,
  exitDocumentFullscreen,
  FullscreenElement,
  getFullscreenElement,
  StyledLandscapeOverlay,
  StyledVideoCard,
} from './videoShared';

function getYoutubeEmbedUrl(watchUrl: string, allowFullscreen = true) {
  try {
    const url = new URL(watchUrl);
    const videoId = url.searchParams.get('v');
    if (!videoId) return '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&controls=1&rel=0&modestbranding=1&fs=${
      allowFullscreen ? 1 : 0
    }`;
  } catch (error) {
    return '';
  }
}

function getYoutubeThumbnailUrl(watchUrl: string) {
  try {
    const url = new URL(watchUrl);
    const videoId = url.searchParams.get('v');
    if (!videoId) return '';
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  } catch (error) {
    return '';
  }
}

export default function TurboRangeFAQYoutubeVideo({
  watchUrl,
  visible,
  isMobile,
}: {
  watchUrl: string;
  visible: boolean;
  isMobile: boolean;
}) {
  const intl = useIntl();
  const isAppH5 = useIsAppH5();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playerSeed, setPlayerSeed] = useState(0);
  const [showLandscapePlayer, setShowLandscapePlayer] = useState(false);

  const useLandscapeOverlay = isAppH5 && isMobile;
  const showInlineYoutubePlayer = !useLandscapeOverlay && hasStarted;

  const inlineYoutubeSrc = useMemo(() => {
    if (!hasStarted) {
      return '';
    }

    return getYoutubeEmbedUrl(watchUrl, false);
  }, [hasStarted, watchUrl]);

  const landscapeYoutubeSrc = useMemo(() => {
    if (!showLandscapePlayer) {
      return '';
    }

    return getYoutubeEmbedUrl(watchUrl, false);
  }, [showLandscapePlayer, watchUrl]);

  const youtubeThumbnail = useMemo(
    () => getYoutubeThumbnailUrl(watchUrl),
    [watchUrl]
  );

  const resetVideo = useCallback(() => {
    setShowLandscapePlayer(false);
    setHasStarted(false);
    setIsPlaying(false);
    setPlayerSeed((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!visible) {
      resetVideo();
    }
  }, [resetVideo, visible]);

  useEffect(() => resetVideo, [resetVideo]);

  useEffect(() => {
    if (!showLandscapePlayer) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [showLandscapePlayer]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const syncFullscreenState = () => {
      const wrapper = wrapperRef.current;
      const fullscreenElement = getFullscreenElement();

      setIsFullscreen(
        Boolean(
          wrapper &&
            fullscreenElement &&
            (fullscreenElement === wrapper ||
              wrapper.contains(fullscreenElement))
        )
      );
    };

    syncFullscreenState();
    document.addEventListener('fullscreenchange', syncFullscreenState);
    document.addEventListener('webkitfullscreenchange', syncFullscreenState);

    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState);
      document.removeEventListener(
        'webkitfullscreenchange',
        syncFullscreenState
      );
    };
  }, []);

  const enterFullscreen = useCallback(() => {
    const wrapper = wrapperRef.current as FullscreenElement | null;

    if (wrapper?.requestFullscreen && canUseDocumentFullscreen()) {
      wrapper.requestFullscreen().catch(() => undefined);
      return;
    }

    if (wrapper?.webkitRequestFullscreen && canUseDocumentFullscreen()) {
      wrapper.webkitRequestFullscreen();
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitDocumentFullscreen();
      return;
    }

    enterFullscreen();
  }, [enterFullscreen, isFullscreen]);

  const handlePlay = useCallback(() => {
    if (useLandscapeOverlay) {
      setShowLandscapePlayer(true);
      setIsPlaying(true);
      return;
    }

    setHasStarted(true);
    setIsPlaying(true);

    if (!isMobile) {
      enterFullscreen();
    }
  }, [enterFullscreen, isMobile, useLandscapeOverlay]);

  const handleLandscapeClose = useCallback(() => {
    setShowLandscapePlayer(false);
    setHasStarted(false);
    setIsPlaying(false);
    setPlayerSeed((prev) => prev + 1);
  }, []);

  const landscapePlayer =
    showLandscapePlayer && typeof document !== 'undefined'
      ? createPortal(
          <StyledLandscapeOverlay onClick={handleLandscapeClose}>
            <button
              type="button"
              className="landscape-close"
              onClick={(event) => {
                event.stopPropagation();
                handleLandscapeClose();
              }}
              aria-label={intl.close}
            >
              <span className="landscape-close-label">{intl.close}</span>
              <Close />
            </button>
            <div
              className="landscape-stage"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="landscape-player">
                <iframe
                  key={`landscape-${playerSeed}`}
                  title={intl.turboRange.how_does_turbo_range_earn_yield}
                  src={landscapeYoutubeSrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
            </div>
          </StyledLandscapeOverlay>,
          document.body
        )
      : null;

  let mediaNode: React.ReactNode = <div className="video-poster" />;

  if (showInlineYoutubePlayer) {
    mediaNode = (
      <iframe
        key={playerSeed}
        title={intl.turboRange.how_does_turbo_range_earn_yield}
        src={inlineYoutubeSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    );
  } else if (youtubeThumbnail) {
    mediaNode = (
      <img
        key={playerSeed}
        className="video-poster-image"
        src={youtubeThumbnail}
        alt={intl.turboRange.how_does_turbo_range_earn_yield}
      />
    );
  }

  return (
    <>
      <StyledVideoCard
        ref={wrapperRef}
        className={isPlaying ? 'is-playing' : ''}
      >
        {mediaNode}
        {!showInlineYoutubePlayer && (
          <button
            type="button"
            className={`video-action video-play ${
              hasStarted ? 'has-started' : ''
            }`}
            onClick={handlePlay}
            aria-label={intl.turboRange.how_does_turbo_range_earn_yield}
          >
            <span className="play-icon" />
          </button>
        )}
        {(useLandscapeOverlay || canUseDocumentFullscreen()) && (
          <button
            type="button"
            className="video-action video-fullscreen"
            onClick={useLandscapeOverlay ? handlePlay : toggleFullscreen}
            aria-label={intl.icon_full_screen}
          >
            <TvFullScreen size={18} />
          </button>
        )}
      </StyledVideoCard>
      {landscapePlayer}
    </>
  );
}
