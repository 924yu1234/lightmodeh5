import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconLine(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon`} {...rest}>
      <svg viewBox="0 0 20 20" width={size || 20} height={size || 20}>
        <g
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
        >
          <path
            d="M2,14.7553711 L5.92286678,10.6381578 L10.6020508,12.5058594 C13.9931641,9.03597005 16.4784342,6.53401693 18.0578613,5"
            stroke="currentColor"
            strokeWidth="1.4"
          ></path>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconLine.propTypes = {
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
