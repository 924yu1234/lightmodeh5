import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconArea(props) {
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
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
        >
          <g
            transform="translate(1.720947, 3.058350)"
            stroke="currentCOlor"
            strokeWidth="1.4"
          >
            <path d="M0,9.75537109 L3.92286678,5.63815775 L8.60205078,7.50585937 C11.9931641,4.03597005 14.4784342,1.53401693 16.0578613,0"></path>
            <path
              d="M0.14856328,13.733815 L4.36132812,9.57104492 L4.36132812,9.57104492 L8.7918632,11.2156489 C8.96294929,11.2800181 9.15511166,11.2437118 9.29211635,11.1227188 C12.2609749,8.45667768 14.5162233,6.37499992 16.0578613,4.87768555 L16.0578613,14.484375 C16.0578613,14.7605174 15.8340037,14.984375 15.5578613,14.984375 L0.5,14.984375 C0.223857625,14.984375 1.23691709e-15,14.7605174 0,14.484375 L0,14.0894725 C-2.40334602e-15,13.9558297 0.05350119,13.827749 0.14856328,13.733815 Z"
              fill="currentCOlor"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconArea.propTypes = {
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
