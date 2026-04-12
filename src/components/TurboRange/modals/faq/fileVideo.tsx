import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Close from 'src/components/Icons/close';
import TvFullScreen from 'src/components/Icons/tv_fullScreen';
import { useIntl } from 'src/locals';
import { useIsAppH5 } from 'src/providers/useWallet';

import {
  canUseDocumentFullscreen,
  FullscreenElement,
  FullscreenVideoElement,
  StyledLandscapeOverlay,
  StyledVideoCard,
} from './videoShared';

export default function TurboRangeFAQFileVideo({
  src,
  visible,
  isMobile,
}: {
  src: string;
  visible: boolean;
  isMobile: boolean;
}) {
  const intl = useIntl();
  const isAppH5 = useIsAppH5();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldAutoFullscreenRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerSeed, setPlayerSeed] = useState(0);
  const [showLandscapePlayer, setShowLandscapePlayer] = useState(false);

  const useLandscapeOverlay = isAppH5 && isMobile;
  const showPlayOverlay = useLandscapeOverlay || !isPlaying;

  const resetVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    shouldAutoFullscreenRef.current = false;
    setShowLandscapePlayer(false);
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

  const enterFullscreen = useCallback(() => {
    const video = videoRef.current as FullscreenVideoElement | null;
    const wrapper = wrapperRef.current as FullscreenElement | null;

    if (video?.requestFullscreen && canUseDocumentFullscreen()) {
      const fullscreenPromise = video.requestFullscreen();
      fullscreenPromise.catch(() => {
        if (video?.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        }
      });
      return;
    }

    if (video?.webkitRequestFullscreen && canUseDocumentFullscreen()) {
      video.webkitRequestFullscreen();
      return;
    }

    if (wrapper?.requestFullscreen && canUseDocumentFullscreen()) {
      const fullscreenPromise = wrapper.requestFullscreen();
      fullscreenPromise.catch(() => {
        if (video?.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        }
      });
      return;
    }

    if (wrapper?.webkitRequestFullscreen && canUseDocumentFullscreen()) {
      wrapper.webkitRequestFullscreen();
      return;
    }

    if (video?.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  }, []);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;

    if (useLandscapeOverlay) {
      setShowLandscapePlayer(true);
      setIsPlaying(true);
      return;
    }

    if (!video) {
      return;
    }

    if (video.ended) {
      video.currentTime = 0;
    }

    shouldAutoFullscreenRef.current = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        shouldAutoFullscreenRef.current = false;
      });
    }
  }, [useLandscapeOverlay]);

  const handleLandscapeClose = useCallback(() => {
    setShowLandscapePlayer(false);
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
                <video
                  key={`landscape-${playerSeed}`}
                  src={src}
                  controls
                  controlsList="nofullscreen"
                  disablePictureInPicture
                  autoPlay
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <track kind="captions" label="Captions" />
                </video>
              </div>
            </div>
          </StyledLandscapeOverlay>,
          document.body
        )
      : null;

  return (
    <>
      <StyledVideoCard
        ref={wrapperRef}
        className={isPlaying ? 'is-playing' : ''}
      >
        <video
          key={playerSeed}
          ref={videoRef}
          src={src}
          preload="metadata"
          controls={!useLandscapeOverlay}
          playsInline
          onPlay={() => {
            setIsPlaying(true);
            if (shouldAutoFullscreenRef.current && !isMobile) {
              shouldAutoFullscreenRef.current = false;
              enterFullscreen();
            }
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <track kind="captions" label="Captions" />
        </video>
        {showPlayOverlay && (
          <button
            type="button"
            className="video-action video-play"
            onClick={handlePlay}
            aria-label={intl.turboRange.how_does_turbo_range_earn_yield}
          >
            <span className="play-icon" />
          </button>
        )}
        <button
          type="button"
          className="video-action video-fullscreen"
          onClick={useLandscapeOverlay ? handlePlay : enterFullscreen}
          aria-label={intl.icon_full_screen}
        >
          <TvFullScreen size={18} />
        </button>
      </StyledVideoCard>
      {landscapePlayer}
    </>
  );
}
