import React from 'react';
import styled from 'styled-components';

export default function IconStatusProcessing({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-status-processing`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 50}
        height={size || 50}
        viewBox="0 0 50 50"
        version="1.1"
      >
        <g
          id="popup_connect"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon" fill="#50E4A2" fillRule="nonzero">
            <g id="tips">
              <path
                d="M25,0 C38.8072056,0 50,11.1928502 50,25 C50,38.8072056 38.8072056,50 25,50 C11.192906,50 0,38.8072056 0,25 C0,11.192906 11.192906,0 25,0 Z M17.5918324,23.4557765 C16.6665275,23.4557765 15.9164198,24.2058843 15.9164198,25.1311891 C15.9164198,26.0564939 16.6665275,26.8066017 17.5918324,26.8066017 C18.5171372,26.8066017 19.267245,26.0564939 19.267245,25.1311891 C19.267245,24.2058843 18.5171372,23.4557765 17.5918324,23.4557765 Z M25.1311891,23.4557765 C24.2058843,23.4557765 23.4557765,24.2058843 23.4557765,25.1311891 C23.4557765,26.0564939 24.2058843,26.8066017 25.1311891,26.8066017 C26.0564939,26.8066017 26.8066017,26.0564939 26.8066017,25.1311891 C26.8066017,24.2058843 26.0564939,23.4557765 25.1311891,23.4557765 Z M32.6705458,23.4557765 C31.745241,23.4557765 30.9951332,24.2058843 30.9951332,25.1311891 C30.9951332,26.0564939 31.745241,26.8066017 32.6705458,26.8066017 C33.5958506,26.8066017 34.3459584,26.0564939 34.3459584,25.1311891 C34.3459584,24.2058843 33.5958506,23.4557765 32.6705458,23.4557765 Z"
                id="形状"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
`;
