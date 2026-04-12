import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function OprChart(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-opr-chart`} {...rest}>
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 14 14"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            transform="translate(7.000000, 7.000000) scale(1, -1) rotate(90.000000) translate(-7.000000, -7.000000) "
            fill="currentColor"
          >
            <rect
              x="0"
              y="4.07272727"
              width="14"
              height="1.90909091"
              rx="0.954545455"
            ></rect>
            <rect
              x="0"
              y="8.08181818"
              width="11.2"
              height="1.90909091"
              rx="0.954545455"
            ></rect>
            <rect
              x="0"
              y="12.0909091"
              width="5.6"
              height="1.90909091"
              rx="0.954545455"
            ></rect>
            <rect
              x="6.6317322e-14"
              y="-2.3499766e-14"
              width="8.4"
              height="1.90909091"
              rx="0.954545455"
            ></rect>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

OprChart.propTypes = {
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
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;
