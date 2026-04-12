/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import { orderBy as orderByFn } from 'lodash';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useIsFetchingDetails, useVaults } from 'src/state/intent/earn/hooks';
import digit from 'src/utils/digit';

import { StyledViewItem } from './style';

export default function Earn({
  config,
  cardSize,
}: {
  config: any;
  cardSize: number;
}) {
  const navigate = useCustomNavigate();
  const intl = useIntl();
  const vaults = useVaults();
  const isFetchingDetails = useIsFetchingDetails();
  const { orderBy = '', orderDir = '', size = 2 } = config;

  const showVaults = useMemo(() => {
    if (isFetchingDetails) {
      return [];
    }
    return orderByFn(
      vaults,
      (d: any) => Number(d[orderBy] || d.apy || 0),
      orderDir || 'desc'
    ).slice(0, size);
  }, [vaults, orderBy, orderDir, size, isFetchingDetails]);

  return (
    <StyledEarn className="view-container" cardSize={cardSize}>
      <div className="item-title">
        {intl.turboRange.Simple_Earn}
        <div
          className="title-more"
          onClick={() => {
            navigate('/simple-earn');
          }}
        >
          {intl.more}
          <IconRightOutlined />
        </div>
      </div>
      <div className="carousel-container">
        {isFetchingDetails &&
          new Array(2).fill(0).map((_, index) => (
            <StyledViewItem
              cardSize={cardSize}
              key={index}
              className="carousel-item earn-item"
            >
              <div className="token-info">
                <Skeleton height={28} width={28} circle />
                <div className="token-symbol">
                  <Skeleton height={16} width={60} />
                  <Skeleton height={12} width={80} style={{ marginTop: 4 }} />
                </div>
              </div>
              <div className="apy-value">
                <Skeleton height={16} width={80} />
              </div>
            </StyledViewItem>
          ))}
        {showVaults.slice(0, 2).map((product: any) => {
          const { token, apy, shortName } = product;
          return (
            <StyledViewItem
              className="carousel-item earn-item"
              cardSize={cardSize}
              key={product.poolAddress}
              onClick={() => {
                navigate(`/simple-earn/${product.id}`);
              }}
            >
              <div className="token-info">
                <TokenIcon token={token} size={28} hideChainIcon />
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
          );
        })}
      </div>
    </StyledEarn>
  );
}

const StyledEarn = styled.div`
  width: ${({ cardSize }: { cardSize: number }) => cardSize * 2 + 10}px;
  .carousel-container {
    display: flex;
    gap: 10px;
    min-height: 100px;
  }
`;
