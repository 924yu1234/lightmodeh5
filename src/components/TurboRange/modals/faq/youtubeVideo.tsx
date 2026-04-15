import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useIntl } from 'src/locals';

import {
  exitDocumentFullscreen,
  getFullscreenElement,
  StyledVideoCard,
} from './videoShared';

type YouTubePlayer = {
  cueVideoById: (videoId: string) => void;
  getIframe: () => HTMLIFrameElement;
  loadVideoById: (videoId: string) => void;
  playVideo: () => void;
  stopVideo: () => void;
};

function getYoutubeVideoId(watchUrl: string) {
  try {
    const url = new URL(watchUrl);
    return url.searchParams.get('v') || '';
  } catch (error) {
    return '';
  }
}

function getYoutubeEmbedUrl(videoId: string) {
  if (!videoId) return '';

  const params = new URLSearchParams({
    controls: '1',
    enablejsapi: '1',
    fs: '1',
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
  });

  if (typeof window !== 'undefined' && window.location.origin) {
    params.set('origin', window.location.origin);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function stopYoutubePlayer(player: YouTubePlayer | null) {
  if (player && typeof player.stopVideo === 'function') {
    player.stopVideo();
  }
}

export default function TurboRangeFAQYoutubeVideo({
  watchUrl,
  visible,
}: {
  watchUrl: string;
  visible: boolean;
}) {
  const intl = useIntl();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerFrameRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const shouldAutoplayRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerSeed, setPlayerSeed] = useState(0);

  const videoId = useMemo(() => getYoutubeVideoId(watchUrl), [watchUrl]);
  const youtubeEmbedUrl = useMemo(() => getYoutubeEmbedUrl(videoId), [videoId]);

  const destroyPlayer = useCallback(() => {
    stopYoutubePlayer(playerRef.current);
    playerRef.current = null;
  }, []);

  const resetVideo = useCallback(() => {
    shouldAutoplayRef.current = false;
    destroyPlayer();
    if (getFullscreenElement()) {
      exitDocumentFullscreen();
    }
    setIsPlaying(false);
    setPlayerSeed((prev) => prev + 1);
  }, [destroyPlayer]);

  useEffect(() => {
    if (!visible) {
      resetVideo();
    }
  }, [resetVideo, visible]);

  useEffect(() => resetVideo, [resetVideo]);

  return (
    <StyledVideoCard ref={wrapperRef} className={isPlaying ? 'is-playing' : ''}>
      <iframe
        key={playerSeed}
        ref={playerFrameRef}
        className="youtube-player-shell"
        title={intl.turboRange.how_does_turbo_range_earn_yield}
        src={youtubeEmbedUrl}
        allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </StyledVideoCard>
  );
}
