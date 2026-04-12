import React, { useMemo, useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import styled from 'styled-components';

import { useSetLocale } from 'src/locals';
import WindowOpen from 'src/utils/windowOpen';

import '@mantine/carousel/styles.css';

export default function ImageBanner({
  banners,
  height,
}: {
  banners: any[];
  height: number;
}) {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const { locale } = useSetLocale();

  if (banners.length <= 2) {
    return (
      <StyledSingleBanner height={height}>
        {banners.map((banner) => {
          const image = (banner.image || {}) as any;
          const imageUrl = image?.[locale] || image['en-US'];
          return (
            <div className="carousel-item" key={banner.id}>
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
          );
        })}
      </StyledSingleBanner>
    );
  }

  const showBanners = useMemo(() => {
    const res = [];
    for (let i = 0; i < banners.length; i += 2) {
      res.push({
        id: `${banners[i].id}-${banners[i + 1]?.id}`,
        imgs: [banners[i], banners[i + 1]],
      });
    }
    return res;
  }, [banners]);

  return (
    <StyledBanner>
      <Carousel
        plugins={[autoplay.current] as any}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        withControls={false}
        slidesToScroll={1}
        slideGap="20px"
        slideSize="100%"
        loop
        height={height}
      >
        {showBanners.map((banner) => {
          const { imgs, id } = banner;
          return (
            <Carousel.Slide key={id}>
              <div className="carousel-item" style={{ height: `${height}px` }}>
                {imgs.map((d: any) => {
                  if (!d) return null;
                  const image = (d.image || {}) as any;
                  const imageUrl = image?.[locale] || image['en-US'];
                  return (
                    <img
                      src={imageUrl}
                      alt=""
                      className={`banner-img ${
                        imageUrl ? 'cursorPointer' : ''
                      }`}
                      onClick={() => {
                        if (d.url) {
                          WindowOpen(d.url);
                        }
                      }}
                    />
                  );
                })}
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </StyledBanner>
  );
}

const StyledSingleBanner = styled.div<{ height: number }>`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  .carousel-item {
    border: 1px solid ${({ theme }) => theme.border_b7b_10};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ height }) => height}px;
    width: calc(50% - 10px);
    .banner-img {
      max-width: 100%;
      border-radius: 5px;
      height: 100%;
      &.cursorPointer {
        cursor: pointer;
      }
    }
  }
`;

const StyledBanner = styled.div`
  width: 100%;
  margin-bottom: 50px;

  .mantine-Carousel-indicators {
    bottom: 10px;
    .mantine-Carousel-indicator {
      width: 10px;
      height: 3px;
    }
  }
  .mantine-Carousel-slide {
    justify-content: center;
  }
  .carousel-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  }
  .banner-img {
    border: 1px solid ${({ theme }) => theme.border_b7b_10};
    border-radius: 5px;
    width: calc(50% - 10px);
    border-radius: 5px;
    height: 100%;
    &.cursorPointer {
      cursor: pointer;
    }
  }
`;
