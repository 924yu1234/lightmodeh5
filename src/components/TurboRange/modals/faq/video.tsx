import React, { useMemo } from 'react';

import { useSetLocale } from 'src/locals';

import TurboRangeFAQFileVideo from './fileVideo';
import TurboRangeFAQYoutubeVideo from './youtubeVideo';

const TURBO_RANGE_CHINESE_VIDEO =
  'https://v1-mainnet-cdn.degate.com/share/chinese_simplified.mp4';

type VideoSource =
  | {
      type: 'file';
      src: string;
    }
  | {
      type: 'youtube';
      watchUrl: string;
    };

const TURBO_RANGE_FAQ_VIDEO_MAP: Record<string, VideoSource> = {
  'en-US': {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=Jl0TEltTHug',
  },
  'zh-CN': { type: 'file', src: TURBO_RANGE_CHINESE_VIDEO },
  'zh-TW': {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=D04KAL52nLU',
  },
  it: {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=J2QUSmx8CTQ',
  },
  ru: {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=4Ut_eiL6HJ0',
  },
  'uk-UA': {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=92FOokHDyKo',
  },
  'ja-JP': {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=JVlZuQAtXkE',
  },
  tr: {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=hHPTaJ_o4EU',
  },
  de: {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=lojBHKM9SKg',
  },
  es: {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=9ZgAqtiGn18',
  },
  fr: {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=vvDE4usLmQo',
  },
  kr: {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=ft77_AikD9U',
  },
  vi: {
    type: 'youtube',
    watchUrl: 'https://www.youtube.com/watch?v=W0MKto6SVIU',
  },
};

function normalizeLocale(locale: string) {
  const normalized = locale.toLowerCase();

  if (TURBO_RANGE_FAQ_VIDEO_MAP[locale]) return locale;
  if (normalized.startsWith('fr')) return 'fr';
  if (normalized.startsWith('de')) return 'de';
  if (normalized.startsWith('es')) return 'es';
  if (normalized.startsWith('it')) return 'it';
  if (normalized.startsWith('ru')) return 'ru';
  if (normalized.startsWith('tr')) return 'tr';
  if (normalized.startsWith('vi')) return 'vi';
  if (normalized.startsWith('ko') || normalized.startsWith('kr')) return 'kr';
  if (normalized.startsWith('ja')) return 'ja-JP';
  if (normalized.startsWith('uk')) return 'uk-UA';
  if (normalized.startsWith('zh-tw') || normalized.startsWith('zh-hk'))
    return 'zh-TW';
  if (normalized.startsWith('zh')) return 'zh-CN';
  if (normalized.startsWith('en')) return 'en-US';

  return locale;
}

export default function TurboRangeFAQVideo({
  visible,
  isMobile,
}: {
  visible: boolean;
  isMobile: boolean;
}) {
  const { locale } = useSetLocale();
  const normalizedLocale = useMemo(
    () => normalizeLocale(locale || 'zh-CN'),
    [locale]
  );

  const videoSource = useMemo(
    () =>
      TURBO_RANGE_FAQ_VIDEO_MAP[normalizedLocale] || {
        type: 'file' as const,
        src: TURBO_RANGE_CHINESE_VIDEO,
      },
    [normalizedLocale]
  );

  if (videoSource.type === 'file') {
    return (
      <TurboRangeFAQFileVideo
        src={videoSource.src}
        visible={visible}
        isMobile={isMobile}
      />
    );
  }

  return (
    <TurboRangeFAQYoutubeVideo
      watchUrl={videoSource.watchUrl}
      visible={visible}
    />
  );
}
