import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconArrowDown(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-arrows`} {...rest}>
      <svg
        width={size || 8}
        height={size || 8}
        viewBox="0 0 10 4"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            transform="translate(-730.000000, -37.000000)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <g>
              <g transform="translate(677.500000, 28.000000)">
                <path
                  d="M58.6336039,9.70252223 L62.2660701,13.2883382 C62.65911,13.6763305 62.663202,14.3094823 62.2752097,14.7025222 C62.0873154,14.8928609 61.8310045,15 61.5635479,15 L54.3920348,15 C53.8397501,15 53.3920348,14.5522847 53.3920348,14 C53.3920348,13.7370516 53.4956023,13.484684 53.6803136,13.297538 L57.2194801,9.71172125 C57.6073789,9.31858901 58.2405304,9.31444351 58.6336031,9.70240256 C58.6336232,9.70242238 58.6336433,9.70244219 58.6336039,9.70252223 Z"
                  transform="translate(58.000000, 12.000000) scale(1, -1) translate(-58.000000, -12.000000) "
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconArrowDown.propTypes = {
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
  color: ${(props) => props.theme.t_a1a};
`;
