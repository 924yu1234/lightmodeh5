import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconMenuMore(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-menu-more`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="icon-more"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g
            transform="translate(-10.000000, -10.000000)"
            fill="currentColor"
            id="编组-6"
          >
            <g transform="translate(19.000000, 12.000000)">
              <circle id="椭圆形" cx="1.5" cy="1.5" r="1.5"></circle>
              <circle id="椭圆形" cx="1.5" cy="8" r="1.5"></circle>
              <circle id="椭圆形" cx="1.5" cy="14.5" r="1.5"></circle>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconMenuMore.propTypes = {
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
