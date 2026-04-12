import React from 'react';
import styled from 'styled-components';

export default function IconArrow({
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
      className={`${className} dg-icon icon-arrow`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 18}
        height={size || 18}
        viewBox="0 0 18 18"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="arrow-blue"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M15.881635,8.80044751 C16.0944096,8.34708596 16.0158568,7.81084626 15.681933,7.43718415 L10.0679731,1.37501699 C9.95358845,1.25921853 9.82088132,1.16298734 9.6751709,1.09018056 C9.50025728,1.01961734 9.21139526,0.99388602 9.02244965,1.00119801 C8.83410414,1.01818439 8.65139902,1.07426592 8.48606003,1.16584336 C8.3429644,1.25007501 8.21100392,1.35184908 8.09325779,1.46879076 L2.36296626,7.44212351 C2.17065985,7.61359143 2.04405839,7.84639594 2.00482306,8.10070485 C1.98346096,8.34239083 2.03336926,8.58503607 2.14841044,8.79880107 C2.25070369,9.01878761 2.42068904,9.20047597 2.63363673,9.31743385 C2.83664056,9.42598245 3.06348249,9.4825563 3.29380857,9.48207919 L6.26458181,9.48207919 L6.26458181,15.5933941 C6.28990778,15.9536168 6.44946264,16.2913401 6.71184823,16.5401048 C6.95957087,16.8034247 7.29803645,16.9634262 7.6591948,16.9879401 L10.3824036,16.9879401 C10.7670893,17.0419798 11.1548631,16.9124762 11.4293983,16.6382787 C11.7039335,16.3640811 11.8332916,15.9770889 11.778667,15.5933941 L11.778667,9.48207919 L14.533234,9.48207919 C15.0944563,9.6339817 15.6803681,9.34031294 15.893188,8.80044751 L15.881635,8.80044751 Z"
            id="路径"
            fill="#00A0FF"
            fillRule="nonzero"
            transform="translate(9, 9) scale(1, -1) translate(-9, -9)"
          ></path>
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
