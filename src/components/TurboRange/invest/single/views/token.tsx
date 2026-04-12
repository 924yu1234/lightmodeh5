import React from 'react';
import styled from 'styled-components';

import IconCandle from 'src/components/Icons/candle';
import IconWrapper2 from 'src/components/Icons/IconWrapper2';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { ThemeType, useThemeParams } from 'src/theme';

import TurboRangeAsset from '../../../modals/asset/modal';
import ProductName from '../../../productName';
import { useApyContext } from '../../apyProvider';

export default function Token() {
  const { product } = useApyContext();
  const { isMobile } = useThemeParams();
  const navigate = useCustomNavigate();
  if (!isMobile) {
    return null;
  }
  return (
    <StyledToken className="token">
      <TokenIcon token={product?.baseToken} hideChainIcon size={32} />
      <div className="token-symbol">
        <ProductName poolAddress={product?.poolAddress} />
      </div>
      <TurboRangeAsset product={product} />
      <IconWrapper2
        size={32}
        onClick={() => {
          navigate(`/turbo-range/info/${product?.poolAddress}`);
        }}
      >
        <IconCandle size={16} />
      </IconWrapper2>
    </StyledToken>
  );
}

const StyledToken = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 5px;
  .about-turbo-range {
    cursor: pointer;
    margin-left: auto;
  }
  .token-symbol {
    font-size: 18px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  }
  .dg-icon-wrapper2 {
    margin-left: 10px;
  }
`;
