import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconMinus(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-minus`} {...rest}>
      <svg width={size || 12} height={size || 12} viewBox="0 0 12 12">
        <g
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <path
            d="M0.627300958,5 L11.372699,5 C11.5791743,5 11.6627299,5.0232064 11.7442114,5.06678318 C11.8256929,5.11035995 11.8896401,5.17430709 11.9332168,5.25578857 C11.9767936,5.33727006 12,5.42082568 12,5.62730096 L12,5.87269904 C12,6.07917432 11.9767936,6.16272994 11.9332168,6.24421143 C11.8896401,6.32569291 11.8256929,6.38964005 11.7442114,6.43321682 C11.6627299,6.4767936 11.5791743,6.5 11.372699,6.5 L0.627300958,6.5 C0.420825683,6.5 0.337270056,6.4767936 0.255788574,6.43321682 C0.174307093,6.38964005 0.110359949,6.32569291 0.0667831759,6.24421143 C0.0232064028,6.16272994 7.33597013e-17,6.07917432 -1.17951889e-16,5.87269904 L1.5589871e-17,5.62730096 C-9.69605733e-18,5.42082568 0.0232064028,5.33727006 0.0667831759,5.25578857 C0.110359949,5.17430709 0.174307093,5.11035995 0.255788574,5.06678318 C0.337270056,5.0232064 0.420825683,5 0.627300958,5 Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </StyledSpan>
  );
}
IconMinus.propTypes = {
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
  &.disabled {
    color: ${({ theme }) => theme.t_b7b_15};
  }
`;
