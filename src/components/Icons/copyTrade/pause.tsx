import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradePause({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-pause`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.41928 4.60828C6.21415 4.60828 6.04785 4.77457 6.04785 4.9797V11.1702C6.04785 11.3753 6.21415 11.5416 6.41928 11.5416H7.16214C7.36727 11.5416 7.53357 11.3753 7.53357 11.1702V4.9797C7.53357 4.77457 7.36727 4.60828 7.16214 4.60828H6.41928Z"
          fill="white"
        />
        <path
          d="M9.88595 4.60828C9.68081 4.60828 9.51452 4.77457 9.51452 4.9797V11.1702C9.51452 11.3753 9.68081 11.5416 9.88595 11.5416H10.6288C10.8339 11.5416 11.0002 11.3753 11.0002 11.1702V4.9797C11.0002 4.77457 10.8339 4.60828 10.6288 4.60828H9.88595Z"
          fill="white"
        />
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  text-rendering: optimizelegibility;

  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;

  color: ${({ theme }) => theme.t_b7b};
`;
