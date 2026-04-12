import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconCandle(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-candle`} {...rest}>
      <svg width={size || 20} height={size || 20} viewBox="0 0 20 20">
        <g
          id="icon_candle_normal"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g fill="currentColor" transform="translate(2.857143, 0.000000)">
            <rect
              id="矩形"
              x="8.57142857"
              y="7.14285714"
              width="7.14285714"
              height="8.57142857"
              rx="1"
            ></rect>
            <rect
              id="矩形"
              x="11.4285714"
              y="2.85714286"
              width="1.42857143"
              height="5.71428571"
              rx="0.5"
            ></rect>
            <rect
              id="矩形"
              x="11.4285714"
              y="14.2857143"
              width="1.42857143"
              height="5.71428571"
              rx="0.5"
            ></rect>
            <rect
              id="矩形"
              x="2.85714286"
              y="0"
              width="1.42857143"
              height="5.71428571"
              rx="0.5"
            ></rect>
            <rect
              id="矩形"
              x="2.85714286"
              y="14.2857143"
              width="1.42857143"
              height="5.71428571"
              rx="0.5"
            ></rect>
            <rect
              id="矩形"
              x="0"
              y="4.28571429"
              width="7.14285714"
              height="11.4285714"
              rx="1"
            ></rect>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}
IconCandle.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};
const StyledSpan = styled.div`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;

  color: ${({ theme }) => theme.t_b7b};
`;
