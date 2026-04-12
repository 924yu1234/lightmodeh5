import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconAccountView(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-accountView`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="iconexplore"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="我的资产-icon-未点" transform="translate(1.000000, 2.000000)">
            <rect
              id="矩形"
              stroke="currentColor"
              strokeWidth="1.4"
              x="0.7"
              y="0.7"
              width="16.6"
              height="14.6"
              rx="2"
            ></rect>
            <rect
              id="矩形"
              fill="currentColor"
              x="1"
              y="6"
              width="16"
              height="1"
            ></rect>
            <circle
              id="椭圆形"
              fill="currentColor"
              cx="3.8"
              cy="3.85714286"
              r="1"
            ></circle>
            <circle
              id="椭圆形"
              fill="currentColor"
              cx="6.8"
              cy="3.85714286"
              r="1"
            ></circle>
            <circle
              id="椭圆形"
              fill="currentColor"
              cx="9.8"
              cy="3.85714286"
              r="1"
            ></circle>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconAccountView.propTypes = {
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
