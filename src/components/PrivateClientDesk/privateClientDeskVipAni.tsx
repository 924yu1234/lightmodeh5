import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';

import data from './vip_icon.json';

export default function IconPrivateClientDeskVipAni({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <StyledSpan
      size={size}
      className={`${className || ''} dg-icon icon-pcd-vip-ani`}
    >
      <div className="svg">
        <Lottie animationData={data} loop />
      </div>
    </StyledSpan>
  );
}

const StyledSpan = styled.span<{ size: number }>`
  display: inline-flex;
  line-height: 0;
  width: ${({ size }: { size: number }) => size}px;
  height: ${({ size }: { size: number }) => size}px;

  .svg div {
    width: ${({ size }: { size: number }) => size}px;
    height: ${({ size }: { size: number }) => size}px;
  }
`;
