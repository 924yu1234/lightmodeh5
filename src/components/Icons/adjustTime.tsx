import React from 'react';
import styled from 'styled-components';

export default function IconAdjustTime({
  className,
  onClick,
  size,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-adjust-time`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="DEG-7386展示类_充值相关优化"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g
            transform="translate(-440, -454)"
            fill="#FEBE2F"
            fillRule="nonzero"
            id="token弹窗"
          >
            <g transform="translate(324, 391)">
              <g id="编组-6" transform="translate(116, 62)">
                <g id="time" transform="translate(0, 1)">
                  <path
                    d="M10,0 C4.47716239,0 0,4.47716239 0,10 C0,15.5228822 4.47716239,20 10,20 C15.5228822,20 20,15.5228822 20,10 C20,4.47714008 15.5228822,0 10,0 Z"
                    id="路径-3"
                    opacity="0.2"
                  ></path>
                  <path
                    d="M12.2928932,6.8627417 C12.6242641,6.8627417 12.8928932,7.13137085 12.8928932,7.4627417 L12.8928932,12.2627417 C12.8928932,12.5941125 12.6242641,12.8627417 12.2928932,12.8627417 C11.9615224,12.8627417 11.6928932,12.5941125 11.6928932,12.2627417 L11.6928932,7.4627417 C11.6928932,7.13137085 11.9615224,6.8627417 12.2928932,6.8627417 Z"
                    id="矩形"
                    transform="translate(12.2929, 9.8627) rotate(90) translate(-12.2929, -9.8627)"
                  ></path>
                  <rect
                    id="矩形"
                    x="9.2"
                    y="3.2"
                    width="1.2"
                    height="7.2"
                    rx="0.6"
                  ></rect>
                </g>
              </g>
            </g>
          </g>
        </g>
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
  vertical-align: -0.125em;
`;
