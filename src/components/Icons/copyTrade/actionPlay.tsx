import React from 'react';
import styled from 'styled-components';

export default function IconActionPlay({
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
      className={`${className} dg-icon icon-action-play`}
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
          id="popup_play"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon">
            <g id="成功-(1)" fill="#50E4A2" fillRule="nonzero">
              <path
                d="M24.999707,0 C11.1927246,0 0,11.1927246 0,24.999707 C0,38.8066895 11.1927246,49.9994141 24.999707,49.9994141 C38.8066895,49.9994141 49.9994141,38.8066895 49.9994141,24.999707 C49.9994141,11.1927246 38.8066895,0 24.999707,0 Z"
                id="形状"
              ></path>
            </g>
            <path
              d="M28.8727534,17.5010976 C29.3264373,17.5962048 29.3884301,17.6581975 29.4318895,17.7326993 L37.6908525,31.8909216 C37.7604225,32.0101846 37.7750655,32.1463558 37.7425003,32.2701038 C37.709935,32.3938518 37.6301615,32.5051765 37.5108985,32.5747466 C37.4344305,32.6193529 37.3474903,32.6428571 37.258963,32.6428571 L20.741037,32.6428571 C20.6029658,32.6428571 20.4779658,32.5868927 20.3874836,32.4964105 C20.2970014,32.4059283 20.241037,32.2809283 20.241037,32.1428571 C20.241037,32.0543298 20.2645412,31.9673897 20.3091475,31.8909216 L28.5681105,17.7326993 C28.6376806,17.6134364 28.7490054,17.5336628 28.8727534,17.5010976 Z"
              id="三角形"
              stroke="#FFFFFF"
              fill="#FFFFFF"
              transform="translate(29, 24.5714) rotate(90) translate(-29, -24.5714)"
            ></path>
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
