import React, { useMemo } from 'react';
import { Carousel } from '@mantine/carousel';
import { orderBy as orderByFn } from 'lodash';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useIsFetchingDetails, useVaults } from 'src/state/intent/earn/hooks';
import digit from 'src/utils/digit';

import { StyledViewItem } from '../style';

import '@mantine/carousel/styles.css';

export default function Earn({ config }: { config: any }) {
  const navigate = useCustomNavigate();
  const intl = useIntl();
  const vaults = useVaults();
  const isFetchingDetails = useIsFetchingDetails();
  const { orderBy = '', orderDir = '', size = 2 } = config;

  const showVaults = useMemo(() => {
    if (isFetchingDetails) {
      return [];
    }
    return orderByFn(vaults, orderBy || 'apy', orderDir || 'desc').slice(
      0,
      size
    );
  }, [vaults, orderBy, orderDir, size, isFetchingDetails]);

  return (
    <StyledEarn className="view-container" cardSize={210}>
      <div
        className="item-title"
        onClick={() => {
          navigate('/simple-earn');
        }}
      >
        {intl.turboRange.Simple_Earn}
        <IconRightOutlined />
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
          {isFetchingDetails &&
            new Array(size).fill(0).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Carousel.Slide key={index}>
                <StyledViewItem
                  cardSize={210}
                  className="carousel-item earn-item"
                >
                  <div className="token-info">
                    <Skeleton height={24} width={24} circle />
                    <div className="token-symbol">
                      <Skeleton height={16} width={60} />
                      <Skeleton
                        height={12}
                        width={80}
                        style={{ marginTop: 4 }}
                      />
                    </div>
                  </div>
                  <div className="apy-value">
                    <Skeleton height={16} width={80} />
                  </div>
                </StyledViewItem>
              </Carousel.Slide>
            ))}
          {showVaults.map((product: any) => {
            const { token, apy, shortName } = product;
            return (
              <Carousel.Slide
                key={product.poolAddress}
                onClick={() => {
                  navigate(`/simple-earn/${product.id}`);
                }}
              >
                <StyledViewItem
                  cardSize={210}
                  className="carousel-item earn-item"
                >
                  <div className="token-info">
                    <TokenIcon token={token} size={24} hideChainIcon />
                    <div className="token-symbol">
                      <div className="token-symbol-text ellipsis">
                        {token?.symbol}
                      </div>
                      <div className="token-name ellipsis">{shortName}</div>
                    </div>
                  </div>
                  <div className="apy-value">
                    {digit.format(apy, '0.00%')}
                    <div className="apy-value-tips">{intl.APY}</div>
                  </div>
                </StyledViewItem>
              </Carousel.Slide>
            );
          })}
          {showVaults?.length > 0 && (
            <Carousel.Slide
              onClick={() => {
                navigate('/simple-earn');
              }}
            >
              <div className="more-card">{intl.more}</div>
            </Carousel.Slide>
          )}
        </Carousel>
      </div>
    </StyledEarn>
  );
}

const StyledEarn = styled.div<{ cardSize: number }>``;
