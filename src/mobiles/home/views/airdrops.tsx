import React from 'react';
import { Carousel } from '@mantine/carousel';
import styled from 'styled-components';

import IconWrapper from 'src/components/Icons/IconWrapper';
import IconRightOutlined from 'src/components/Icons/RightOutlined';
import { useIntl, useSetLocale } from 'src/locals';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import '@mantine/carousel/styles.css';

export default function Airdrops({ config }: { config: any }) {
  const intl = useIntl();
  const { list = [] } = config;
  const { locale } = useSetLocale();

  if (!list?.length) return null;

  return (
    <StyledAirdrops className="view-container">
      <div className="item-title">
        {intl.Airdrops}
        <IconWrapper
          size={24}
          onClick={() => {
            WindowOpen('https://hub.degate.com/airdrops');
          }}
        >
          <IconRightOutlined />
        </IconWrapper>
      </div>
      <div className="carousel-container">
        <Carousel
          withControls={false}
          withIndicators={false}
          slideGap="10px"
          slideSize="210px"
          height={90}
          align="start"
        >
          {list.map((item: any) => {
            const { icon, name, url, tag, completeTime } = item;
            const nameText = name[locale] || name['en-US'];
            const tagText = tag[locale] || tag['en-US'];
            const completeTimeText =
              completeTime[locale] || completeTime['en-US'];
            return (
              <Carousel.Slide
                key={url}
                onClick={() => {
                  WindowOpen(url);
                }}
              >
                <div className="carousel-item airdrop-item">
                  <div className="airdrop-info">
                    <img src={icon} alt={nameText} className="icon-img" />
                    <div className="airdrop-name">{nameText}</div>
                    {tagText && <div className="tag">{tagText}</div>}
                  </div>
                  <div className="complete-time">
                    <div className="complete-time-tips">
                      {intl.Time_to_complete}
                    </div>
                    <div className="complete-time-value">
                      {completeTimeText}
                    </div>
                  </div>
                </div>
              </Carousel.Slide>
            );
          })}
          <Carousel.Slide
            onClick={() => {
              WindowOpen('https://hub.degate.com/airdrops');
            }}
          >
            <div className="more-card">{intl.more}</div>
          </Carousel.Slide>
        </Carousel>
      </div>
    </StyledAirdrops>
  );
}

const StyledAirdrops = styled.div`
  .airdrop-item {
    width: 210px;
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 5px;
    padding: 15px 20px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .airdrop-info {
      font-size: 16px;
      height: 40px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      line-height: 24px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      display: flex;
      align-items: center;
      gap: 5px;
      .icon-img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
      .airdrop-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        line-height: 20px;
      }
      .tag {
        padding: 0 5px;
        margin-left: auto;
        height: 20px;
        background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
        border-radius: 2px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        font-size: 12px;
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        text-align: center;
        line-height: 20px;
      }
    }
    .complete-time {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      line-height: 18px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      .complete-time-tips {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
      }
      .complete-time-value {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
  }
`;
