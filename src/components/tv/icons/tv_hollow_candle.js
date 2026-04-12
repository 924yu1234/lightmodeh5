import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ArrowDown(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon`} {...rest}>
      <svg
        viewBox="0 0 20 20"
        width={size || 20}
        height={size || 20}
        fill="currentColor"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(2.000000, 0.000000)">
            <rect
              stroke="currentColor"
              strokeWidth="1.4"
              x="9.27142857"
              y="7.84285714"
              width="5.74285714"
              height="7.17142857"
              rx="1"
            ></rect>
            <rect
              fill="currentColor"
              x="11.4285714"
              y="2.85714286"
              width="1.42857143"
              height="5.71428571"
              rx="0.5"
            ></rect>
            <rect
              fill="currentColor"
              x="11.4285714"
              y="14.2857143"
              width="1.42857143"
              height="5.71428571"
              rx="0.5"
            ></rect>
            <rect
              fill="currentColor"
              x="2.85714286"
              y="0"
              width="1.42857143"
              height="5.71428571"
              rx="0.5"
            ></rect>
            <rect
              fill="currentColor"
              transform="translate(2.419906, 6.705620) rotate(45.000000) translate(-2.419906, -6.705620) "
              x="1.91990569"
              y="3.84847712"
              width="1"
              height="5.71428571"
              rx="0.5"
            ></rect>
            <rect
              fill="currentColor"
              transform="translate(4.672444, 13.453082) rotate(45.000000) translate(-4.672444, -13.453082) "
              x="4.17244383"
              y="10.9530818"
              width="1"
              height="5"
              rx="0.5"
            ></rect>
            <rect
              fill="currentColor"
              transform="translate(3.581581, 8.543945) rotate(45.000000) translate(-3.581581, -8.543945) "
              x="3.08158112"
              y="4.04394455"
              width="1"
              height="9"
              rx="0.5"
            ></rect>
            <rect
              fill="currentColor"
              transform="translate(3.581581, 11.543945) rotate(45.000000) translate(-3.581581, -11.543945) "
              x="3.08158112"
              y="7.04394455"
              width="1"
              height="9"
              rx="0.5"
            ></rect>
            <rect
              fill="currentColor"
              x="2.85714286"
              y="14.2857143"
              width="1.42857143"
              height="5.71428571"
              rx="0.5"
            ></rect>
            <rect
              stroke="currentColor"
              strokeWidth="1.4"
              x="0.7"
              y="4.98571429"
              width="5.74285714"
              height="10.0285714"
              rx="1"
            ></rect>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

ArrowDown.propTypes = {
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
