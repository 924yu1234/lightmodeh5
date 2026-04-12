import React from 'react';
import styled from 'styled-components';

export default function IconCreateBot({
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
      className={`${className} dg-icon icon-create-bot`}
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
          id="popup_createbot"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon">
            <g id="tips">
              <path
                d="M25,0 C11.192906,0 0,11.192906 0,25 C0,38.8072056 11.192906,50 25,50 C38.8072056,50 50,38.8072056 50,25 C50,11.1928502 38.8072056,0 25,0 Z"
                id="形状"
                fillOpacity="0.3"
                fill="#50E4A2"
                fillRule="nonzero"
              ></path>
              <g id="icon-bot" transform="translate(11, 11)" fill="#02FFAB">
                <path
                  d="M25,4 C26.1045695,4 27,4.8954305 27,6 L27,22 C27,23.1045695 26.1045695,24 25,24 L17.4001872,24 L11.4874064,27.7387695 L11.5077515,24 L4,24 C2.8954305,24 2,23.1045695 2,22 L2,6 C2,4.8954305 2.8954305,4 4,4 L25,4 Z M15,8.5 L14,8.5 C13.7238576,8.5 13.5,8.72385763 13.5,9 L13.5,13 L9.5,13 C9.25454011,13 9.05039163,13.1768752 9.00805567,13.4101244 L9,13.5 L9,14.5 C9,14.7761424 9.22385763,15 9.5,15 L13.5,15 L13.5,19 C13.5,19.2454599 13.6768752,19.4496084 13.9101244,19.4919443 L14,19.5 L15,19.5 C15.2761424,19.5 15.5,19.2761424 15.5,19 L15.5,15 L19.5,15 C19.7454599,15 19.9496084,14.8231248 19.9919443,14.5898756 L20,14.5 L20,13.5 C20,13.2238576 19.7761424,13 19.5,13 L15.5,13 L15.5,9 C15.5,8.75454011 15.3231248,8.55039163 15.0898756,8.50805567 L15,8.5 Z"
                  id="矩形-2"
                ></path>
                <rect id="矩形" x="10" y="0" width="9" height="2" rx="1"></rect>
                <rect id="矩形" x="0" y="10" width="2" height="8"></rect>
                <rect id="矩形" x="27" y="10" width="2" height="8"></rect>
              </g>
            </g>
            <g id="编组" transform="translate(29.2528, 33.6758)"></g>
            <g id="切换用户" transform="translate(12.5656, 10.8902)"></g>
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
  color: ${({ theme }) => theme.buy};
`;
