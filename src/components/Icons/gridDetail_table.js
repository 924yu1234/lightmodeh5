import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function GridDetailTable(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-table`} {...rest}>
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 14 14"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="icon-shape-on"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon-shape">
            <rect
              stroke="currentColor"
              x="0.5"
              y="0.5"
              width="13"
              height="13"
              rx="2"
            ></rect>
            <g
              id="编组-3"
              transform="translate(8.000000, 3.550000)"
              fill="currentColor"
            >
              <rect x="0" y="0" width="4" height="1.4" rx="0.7"></rect>
              <rect x="0" y="3.15" width="4" height="1.4" rx="0.7"></rect>
              <rect x="0" y="6.3" width="4" height="1.4" rx="0.7"></rect>
            </g>
            <g transform="translate(2.000000, 3.550000)" fill="currentColor">
              <rect
                id="矩形"
                x="0"
                y="0"
                width="4"
                height="1.4"
                rx="0.7"
              ></rect>
              <rect x="0" y="3.15" width="4" height="1.4" rx="0.7"></rect>
              <rect x="0" y="6.3" width="4" height="1.4" rx="0.7"></rect>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

GridDetailTable.propTypes = {
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
  &.active {
    color: ${({ theme }) => theme.blue};
  }
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;
