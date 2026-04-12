import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function GridDetailCard(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-card`} {...rest}>
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 14 14"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g>
            <rect
              stroke="currentColor"
              x="0.5"
              y="0.5"
              width="13"
              height="13"
              rx="2"
            ></rect>
            <rect
              fill="currentColor"
              x="2.4"
              y="2.4"
              width="9"
              height="4"
              rx="0.800000012"
            ></rect>
            <rect
              fill="currentColor"
              x="2.4"
              y="7.4"
              width="9"
              height="4"
              rx="0.800000012"
            ></rect>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

GridDetailCard.propTypes = {
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
