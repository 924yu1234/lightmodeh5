import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconSecurity(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-security`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="icon-safe"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g transform="translate(1.000000, 0.000000)">
            <path
              d="M9,0 L0,3.41463414 L0,10.2439025 C0,14.6829269 3.84,18.7707317 9,20 C14.16,18.7707317 18,14.6829269 18,10.2439025 L18,3.41463414 L9,0 Z"
              id="Path"
              stroke="currentColor"
              strokeWidth="1.3"
            ></path>
            <path
              d="M14.7126202,7.6524001 L8.64861624,13.7164815 C8.45961039,13.9054874 8.2118681,14 7.96416453,14 C7.71644161,14 7.46871868,13.9054874 7.27971283,13.7164815 L7.27917076,13.7159201 L4.28351604,10.7203041 C3.90550433,10.3422924 3.90548497,9.72939305 4.28351604,9.3514007 C4.66152775,8.97338899 5.27440775,8.97336963 5.65243882,9.3514007 L7.96416453,11.6631071 L13.3437168,6.28351604 C13.7217092,5.90550433 14.3346085,5.90548497 14.7126396,6.28351604 C15.0906513,6.66150839 15.0906513,7.27438839 14.7126202,7.6524001 L14.7126202,7.6524001 Z"
              id="路径"
              fill="currentColor"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconSecurity.propTypes = {
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
