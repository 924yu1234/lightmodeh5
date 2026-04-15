import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Close from 'src/components/Icons/close';
import { useIntl } from 'src/locals';

import {
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldAutoFullscreenRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerSeed, setPlayerSeed] = useState(0);
  const [showLandscapePlayer, setShowLandscapePlayer] = useState(false);

  const showPlayOverlay = !isPlaying;

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
    if (!video) return;

    // iOS WKWebView (Flutter 等) 中 requestFullscreen() 只能做到 WebView 内部全屏，
    // 无法触发系统级全屏。优先使用 webkitEnterFullscreen() 走原生 AVPlayer 全屏。
    if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
      return;
    }

    // 非 iOS 环境（Android / 桌面浏览器）走标准 Fullscreen API
    const wrapper = wrapperRef.current as FullscreenElement | null;

    if (video.requestFullscreen) {
      video.requestFullscreen();
      return;
    }

    if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
      return;
    }

    if (wrapper?.requestFullscreen) {
      wrapper.requestFullscreen();
      return;
    }

    if (wrapper?.webkitRequestFullscreen) {
      wrapper.webkitRequestFullscreen();
    }
  }, []);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.ended) {
      video.currentTime = 0;
    }

    shouldAutoFullscreenRef.current = !isMobile;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        shouldAutoFullscreenRef.current = false;
      });
    }
  }, [isMobile]);

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
          controls
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
      </StyledVideoCard>
      {landscapePlayer}
    </>
  );
}
