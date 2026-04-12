import React from 'react';
import ChainFeeds from 'imgs/downloadPage/partners/ChainFeeds.png';
import Cobo from 'imgs/downloadPage/partners/Cobo.png';
import Coindesk from 'imgs/downloadPage/partners/Coindesk.png';
import CoinGecko from 'imgs/downloadPage/partners/CoinGecko.png';
import CoinMarketCap from 'imgs/downloadPage/partners/CoinMarketCap.png';
import Cointelegraph from 'imgs/downloadPage/partners/Cointelegraph.png';
import Fenbushi from 'imgs/downloadPage/partners/Fenbushi.png';
import Flowdesk from 'imgs/downloadPage/partners/Flowdesk.png';
import FollowIn from 'imgs/downloadPage/partners/FollowIn.png';
import ForesightNews from 'imgs/downloadPage/partners/ForesightNews.png';
import Hacknoon from 'imgs/downloadPage/partners/Hacknoon.png';
import Hashkey from 'imgs/downloadPage/partners/Hashkey.png';
import Immunefi from 'imgs/downloadPage/partners/Immunefi.png';
import L2Beat from 'imgs/downloadPage/partners/L2Beat.png';
import PANews from 'imgs/downloadPage/partners/PANews.png';
import SNZ from 'imgs/downloadPage/partners/SNZ.png';
import TheBlock from 'imgs/downloadPage/partners/TheBlock.png';
import Wormhole from 'imgs/downloadPage/partners/Wormhole.png';
import { isMobile } from 'react-device-detect';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

const PartnersArray = [
  { name: 'L2Beat', url: 'https://l2beat.com/scaling/activity', img: L2Beat },
  { name: 'Immunefi', url: 'https://immunefi.com/', img: Immunefi },
  { name: 'Wormhole', url: 'https://wormhole.com/', img: Wormhole },
  { name: 'Hashkey', url: 'https://group.hashkey.com/en/', img: Hashkey },
  { name: 'SNZ', url: 'https://snzholding.com/', img: SNZ },
  { name: 'Fenbushi', url: 'https://x.com/fenbushi', img: Fenbushi },
  { name: 'Cobo', url: 'https://www.cobo.com/', img: Cobo },
  { name: 'Flowdesk', url: 'https://www.flowdesk.co/', img: Flowdesk },
  { name: 'CoinGecko', url: 'https://www.coingecko.com/', img: CoinGecko },
  {
    name: 'CoinMarketCap',
    url: 'https://coinmarketcap.com/',
    img: CoinMarketCap,
  },
  { name: 'Coindesk', url: 'https://www.coindesk.com/', img: Coindesk },
  {
    name: 'Cointelegraph',
    url: 'https://cointelegraph.com/',
    img: Cointelegraph,
  },
  {
    name: 'ForesightNews',
    url: 'https://foresightnews.pro/',
    img: ForesightNews,
  },
  { name: 'ChainFeeds', url: 'https://www.chainfeeds.xyz/', img: ChainFeeds },
  {
    name: 'PANews',
    url: 'https://www.panewslab.com/zh/index.html',
    img: PANews,
  },
  { name: 'FollowIn', url: 'https://followin.io/zh-Hans', img: FollowIn },
  { name: 'Hacknoon', url: 'https://hackernoon.com/', img: Hacknoon },
  { name: 'TheBlock', url: 'https://www.theblock.co/', img: TheBlock },
];

const PartnerItem = ({ name, img }: { name: string; img: string }) => (
  <StyledPartnerWrapper key={name}>
    <img src={img} alt={name} height="100%" />
  </StyledPartnerWrapper>
);

export default function PartnersSection() {
  const intl = useIntl();

  return (
    <StyledPartnersSection>
      <div className="partners-title">{intl.download_page_partners}</div>
      {isMobile ? (
        // Mobile: Grid layout
        <div className="partners-grid">
          {PartnersArray.map((partner) => (
            <div key={partner.name} className="partner-grid-item">
              <img src={partner.img} alt={partner.name} />
            </div>
          ))}
        </div>
      ) : (
        // Desktop: Marquee
        <Marquee
          pauseOnHover
          gradient
          gradientColor="#05050d"
          gradientWidth={121}
          speed={40}
        >
          {PartnersArray.map((partner) => (
            <PartnerItem
              key={partner.name}
              name={partner.name}
              img={partner.img}
            />
          ))}
        </Marquee>
      )}
    </StyledPartnersSection>
  );
}

const StyledPartnersSection = styled.div`
  padding-top: 100px;
  padding-bottom: 60px;
  flex: 0 0 auto;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-top: 145px;
    padding-bottom: 40px;
  }

  .partners-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 20px;
    color: ${({ theme }) => theme.t_fff};
    letter-spacing: 0;
    text-align: center;
    font-weight: 600;
    margin-bottom: 80px;

    @media (max-width: 768px) {
      margin-bottom: 40px;
    }
  }

  /* Mobile grid layout */
  .partners-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .partner-grid-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    height: 70px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    background: ${({ theme }) => theme.bg_black_20};

    &:nth-child(2n) {
      border-right: none;
    }

    img {
      max-width: 120px;
      max-height: 40px;
      width: auto;
      height: auto;
      object-fit: contain;
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    &:active {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_black_30};

      img {
        opacity: 1;
      }
    }
  }

  /* Hide scrollbar for Marquee */
  .rfm-marquee-container {
    overflow: hidden !important;
  }

  .rfm-marquee {
    overflow: hidden !important;
  }
`;

const StyledPartnerWrapper = styled.div`
  position: relative;
  margin-right: 80px;
  height: 60px;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    height: 40px;
    margin-right: 40px;
  }

  &:hover {
    opacity: 1;
  }

  img {
    height: 100%;
    width: auto;
    object-fit: contain;
  }
`;
