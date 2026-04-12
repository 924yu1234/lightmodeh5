import React from 'react';
import styled from 'styled-components';

export default function IconDownloadApp({
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
      className={`${className} dg-icon icon-download-app`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 20} height={size || 20} viewBox="0 0 20 20">
        <g
          id="download-app"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g transform="translate(2, 0)" id="编组-22">
            <rect
              id="矩形"
              stroke="currentColor"
              strokeWidth="1.5"
              x="0.75"
              y="0.75"
              width="14.5"
              height="18.5"
              rx="2"
            ></rect>
            <rect
              id="矩形"
              fill="currentColor"
              x="6"
              y="2.2"
              width="4"
              height="1"
              rx="0.5"
            ></rect>
            <g id="编组-4" transform="translate(4, 7)" fill="currentColor">
              <path
                d="M3.96322684,0 L4.0021949,0 C4.27833727,-5.07265313e-17 4.5021949,0.223857625 4.5021949,0.5 L4.5021949,6.0553553 C4.5021949,6.33149768 4.27833727,6.5553553 4.0021949,6.5553553 L3.96322684,6.5553553 C3.68708447,6.5553553 3.46322684,6.33149768 3.46322684,6.0553553 L3.46322684,0.5 C3.46322684,0.223857625 3.68708447,-6.02957711e-17 3.96322684,0 Z"
                id="矩形"
                stroke="currentColor"
                strokeWidth="0.5"
                transform="translate(3.9827, 3.2777) scale(1, -1) translate(-3.9827, -3.2777)"
              ></path>
              <path
                d="M6.99524236,6.65681338 L4.00137163,3.64656383 L0.968167948,6.6963614 C0.865228875,6.79568179 0.725428161,6.85714286 0.571407439,6.85714286 C0.25584011,6.85714286 0,6.5998877 0,6.28257874 C0,6.12772387 0.0611108306,5.98717479 0.160442919,5.88392211 L3.58871958,2.43630422 C3.69279433,2.32829904 3.83843341,2.26068623 3.99998801,2.26068623 C4.1640539,2.26068623 4.3099809,2.32829904 4.41379172,2.43658568 L7.84263622,5.88362458 C7.93944102,5.9883006 8,6.12826264 8,6.28257874 C8,6.5998877 7.74414389,6.85714286 7.42856857,6.85714286 C7.25529729,6.85714286 7.10016487,6.77941387 6.99524236,6.65681338 Z"
                id="路径"
                stroke="current"
                strokeWidth="0.5"
                transform="translate(4, 4.5589) scale(1, -1) translate(-4, -4.5589)"
              ></path>
              <rect id="矩形" x="0" y="8" width="8" height="1" rx="0.5"></rect>
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

  color: ${({ theme }) => theme.t_b7b};

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;
