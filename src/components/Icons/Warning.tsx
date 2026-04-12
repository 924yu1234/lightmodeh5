import React from 'react';
import styled from 'styled-components';

export default function IconPopupWarning({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-popup-warning`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 50} height={size || 50} viewBox="0 0 50 50">
        <g
          id="popup_warning50x50"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g fill="#FEBE2F" fillRule="nonzero">
            <g>
              <path
                d="M25,0 C11.192906,0 0,11.192906 0,25 C0,38.8072056 11.192906,50 25,50 C38.8072056,50 50,38.8072056 50,25 C50,11.1928502 38.8072056,0 25,0 Z"
                fillOpacity="0.2"
              ></path>
              <path d="M25,33.3333333 C26.5341243,33.3333333 27.7777778,34.5769868 27.7777778,36.1111111 C27.7777778,37.6452354 26.5341243,38.8888889 25,38.8888889 C23.4658757,38.8888889 22.2222222,37.6452354 22.2222222,36.1111111 C22.2222222,34.5769868 23.4658757,33.3333333 25,33.3333333 Z M26.7777778,11.1111111 C27.3300625,11.1111111 27.7777778,11.5588264 27.7777778,12.1111111 L27.7777778,26.7777778 C27.7777778,27.3300625 27.3300625,27.7777778 26.7777778,27.7777778 L23.2222222,27.7777778 C22.6699375,27.7777778 22.2222222,27.3300625 22.2222222,26.7777778 L22.2222222,12.1111111 C22.2222222,11.5588264 22.6699375,11.1111111 23.2222222,11.1111111 L26.7777778,11.1111111 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.div`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
`;
