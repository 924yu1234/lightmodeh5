import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconMobileMore(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-mobileMore`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        version="1.1"
      >
        <g
          id="icon-more"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g id="编组-6" transform="translate(2, 3)" fill="#B7BDC6">
            <rect
              id="矩形"
              x="0"
              y="12"
              width="10"
              height="2.5"
              rx="1.25"
            ></rect>
            <rect
              id="矩形"
              x="0"
              y="6"
              width="16"
              height="2.5"
              rx="1.25"
            ></rect>
            <rect
              id="矩形"
              x="0"
              y="0"
              width="16"
              height="2.5"
              rx="1.25"
            ></rect>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconMobileMore.propTypes = {
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
  &.active {
    color: ${({ theme }) => theme.blue};
  }
`;
