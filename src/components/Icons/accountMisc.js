import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function AccountManage(props) {
  const { size, className = '', ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-accountManage`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="-iconothers_off"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="others_off" stroke="currentColor" strokeWidth="1.4">
            <rect
              id="矩形"
              x="0.7"
              y="11.7"
              width="7.6"
              height="7.6"
              rx="2"
            ></rect>
            <rect
              id="矩形"
              x="0.7"
              y="0.7"
              width="7.6"
              height="7.6"
              rx="2"
            ></rect>
            <rect
              id="矩形"
              x="11.7"
              y="0.7"
              width="7.6"
              height="7.6"
              rx="3.8"
            ></rect>
            <rect
              id="矩形"
              x="11.7"
              y="11.7"
              width="7.6"
              height="7.6"
              rx="2"
            ></rect>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}
AccountManage.propTypes = {
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
`;
