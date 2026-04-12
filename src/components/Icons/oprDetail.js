import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function OprDetail(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-opr-detail`} {...rest}>
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 14 14"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="icon-detail"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g id="icon-shape">
            <rect
              id="矩形"
              stroke="currentColor"
              x="0.5"
              y="0.5"
              width="13"
              height="13"
              rx="2"
            ></rect>
            <g id="编组-3" transform="translate(2, 3.55)" fill="currentColor">
              <rect
                id="矩形"
                x="0"
                y="0"
                width="10"
                height="1.4"
                rx="0.7"
              ></rect>
              <rect
                id="矩形"
                x="0"
                y="3.15"
                width="10"
                height="1.4"
                rx="0.7"
              ></rect>
              <rect
                id="矩形"
                x="0"
                y="6.3"
                width="4"
                height="1.4"
                rx="0.7"
              ></rect>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

OprDetail.propTypes = {
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
