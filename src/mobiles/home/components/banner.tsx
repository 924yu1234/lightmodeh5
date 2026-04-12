import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import styled from 'styled-components';

import { useSetLocale } from 'src/locals';
import { ThemeType, useThemeParams } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import { fetchBanners } from '../service';
import BannerVaultItem from './bannerVaultItem';

import '@mantine/carousel/styles.css';

export default function Banner() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const { locale } = useSetLocale();

  const [banners, setBanners] = useState<any[]>([]);

  const { viewWidth } = useThemeParams();

  const bannerHeight = ((viewWidth - 40) / 67) * 14 + 2;

  useEffect(() => {
    fetchBanners().then((resp) => {
      setBanners(resp);
    });
  }, []);

  if (!banners?.length) {
    return null;
  }

  return (
    <StyledBanner>
      <Carousel
        plugins={[autoplay.current] as any}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        withControls={false}
        withIndicators={banners.length > 1}
        height={bannerHeight}
      >
        {banners.map((banner) => {
          if (banner.type === 'vault') {
            return (
              <Carousel.Slide key={banner.id}>
                <div className="carousel-item vault-banner">
                  <BannerVaultItem banner={banner} />
                </div>
              </Carousel.Slide>
            );
          }
          if (banner.type === 'image') {
            const image = (banner.image || {}) as any;
            const imageUrl = image?.[locale] || image['en-US'];
            return (
              <Carousel.Slide key={banner.id}>
                <div className="carousel-item image-banner">
                  <img
                    src={imageUrl}
                    alt=""
                    className={`banner-img ${imageUrl ? 'cursorPointer' : ''}`}
                    onClick={() => {
                      if (banner.url) {
                        WindowOpen(banner.url);
                      }
                    }}
                  />
                </div>
              </Carousel.Slide>
            );
          }
          return null;
        })}
      </Carousel>
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  width: 100%;
  min-height: 70px;

  .mantine-Carousel-indicators {
    bottom: 10px;
    .mantine-Carousel-indicator {
      width: 10px;
      height: 3px;
    }
  }
  .mantine-Carousel-slide {
    justify-content: center;
    .carousel-item {
      border: 1px solid ${({ theme }) => theme.border_b7b_10};
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${({ theme }: { theme: ThemeType }) =>
        theme.windowWidth > 1120 ? 1080 : theme.windowWidth - 40}px;
      height: 100%;
    }
  }
  .banner-img {
    max-width: 100%;
    height: 100%;
    border-radius: 5px;
    &.cursorPointer {
      cursor: pointer;
    }
  }
`;
