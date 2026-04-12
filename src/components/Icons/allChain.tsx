import React from 'react';
import styled from 'styled-components';

export default function IconAllChain({
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
      className={`${className} dg-icon icon-all-chain`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 18}
        height={size || 18}
        viewBox="0 0 18 18"
        version="1.1"
      >
        <title>icon all network</title>
        <g
          id="PRD28"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="快速需求_Balance页面增加网络筛选en1"
            transform="translate(-185, -316)"
          >
            <g id="dropdown" transform="translate(166, 297)">
              <g id="账户资产" transform="translate(0, 8)">
                <g id="icon-all-network" transform="translate(19, 11)">
                  <rect
                    id="矩形"
                    fill="#0E8B88"
                    x="0"
                    y="0"
                    width="8"
                    height="8"
                    rx="2"
                  ></rect>
                  <rect
                    id="矩形"
                    fill="#0F84FF"
                    x="10"
                    y="0"
                    width="8"
                    height="8"
                    rx="2"
                  ></rect>
                  <rect
                    id="矩形"
                    fill="#4278B0"
                    x="0"
                    y="10"
                    width="8"
                    height="8"
                    rx="2"
                  ></rect>
                  <rect
                    id="矩形"
                    fill="#D9A227"
                    x="10"
                    y="10"
                    width="8"
                    height="8"
                    rx="2"
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

const StyledSpan = styled.div`
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
