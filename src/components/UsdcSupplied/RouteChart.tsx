import React from 'react';
import styled from 'styled-components';

import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatAddress } from 'src/utils/format';

import ChainIcon from '../ChainIcon';
import BtnArrow from '../Icons/btnArrow';
import Tag from '../Tag';

interface RouteSource {
  chain: Type_DAChains;
  address: string;
  amount?: string;
}

interface RouteChartProps {
  sources: RouteSource[];
  target: RouteSource;
  className?: string;
}

export default function RouteChart({
  sources,
  target,
  className,
}: RouteChartProps) {
  const intl = useIntl();

  if (!sources?.length) return null;

  return (
    <StyledRouteChart className={className}>
      {/* 左侧来源 */}
      <div className="sources-container">
        {sources.map((source) => {
          return (
            <div key={`source-${source.chain}`} className="address-item">
              <div className="address-item-content">
                <Tag>{intl.me}</Tag>
                <div className="address">
                  <ChainIcon chain={source.chain} size={16} />
                  {formatAddress(source.address)}
                </div>
              </div>
              <div className="line" />
            </div>
          );
        })}
      </div>

      <div className="vertical-lines">
        {sources.length > 1 &&
          sources.map((source) => (
            <div
              key={`line-${source.chain}-${source.address}`}
              className="vertical-line"
            />
          ))}
      </div>
      <div className="arrow-line"></div>
      <BtnArrow size={10} />

      {/* 右侧目标 */}
      <div className="target-container" style={{ marginLeft: '5px' }}>
        <div className="address-item">
          <div className="address-item-content">
            <Tag>{intl.me}</Tag>
            <div className="address">
              <ChainIcon chain={target.chain} size={16} />
              {formatAddress(target.address)}
            </div>
          </div>
        </div>
      </div>
    </StyledRouteChart>
  );
}

const StyledRouteChart = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 0 5px;
  justify-content: center;

  .sources-container {
    .address-item {
      position: relative;
      justify-content: flex-end;

      .line {
        top: 10px;
        width: 8px;
        height: 1px;
        background: ${({ theme }) => theme.bg_white};
      }
    }
  }

  .vertical-lines {
    display: flex;
    flex-direction: column;
    .vertical-line {
      width: 1px;
      height: 40px;
      background: ${({ theme }) => theme.bg_white};
      &:last-child,
      &:first-child {
        height: 20px;
      }
    }
  }

  .arrow-line {
    width: 15px;
    height: 1px;
    background: ${({ theme }) => theme.bg_white};
    margin-right: -5px;
  }

  .address-item {
    display: flex;
    align-items: center;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 12px;
    gap: 5px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    white-space: nowrap;
    .address {
      display: flex;
    }
    .tag {
      transform: scale(0.8);
    }
    .address-item-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      line-height: 20px;
      justify-content: center;
      gap: 0px;
      .address {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
`;
