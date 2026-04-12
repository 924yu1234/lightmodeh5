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
        <g
          id="icon-heikin-ashi"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g transform="translate(2.000000, 0.000000)">
            <rect
              stroke="currentColor"
              strokeWidth="1.4"
              x="9.27142857"
              y="2.84285714"
              width="5.74285714"
              height="10.6"
              rx="1"
            ></rect>
            <rect
              fill="currentColor"
              x="11.3"
              y="0"
              width="1.42857143"
              height="3"
              rx="0.5"
            ></rect>
            <rect
              fill="currentColor"
              x="3"
              y="0"
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
              height="14.6"
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
