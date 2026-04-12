import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function AccountDeposit(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-accountAsset`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill="currentColor" fillRule="nonzero">
            <path d="M13.3995979,11.2620058 L9.57270494,11.2620058 C9.02042019,11.2620058 8.57270494,10.8142906 8.57270494,10.2620058 L8.57270494,6.43399598 C8.57270494,6.05342898 8.88121544,5.74491847 9.26178244,5.74491847 C9.64234944,5.74491847 9.95085995,6.05342898 9.95085995,6.43399598 L9.95085995,8.88161715 C9.95085995,9.4339019 10.3985752,9.88161715 10.95086,9.88161715 L13.3995979,9.88161715 C13.7807817,9.88161715 14.0897923,10.1906277 14.0897923,10.5718115 C14.0897923,10.9529953 13.7807817,11.2620058 13.3995979,11.2620058 Z" />
            <path
              d="M10,20 C4.5,20 0,15.5 0,10 C0,4.5 4.5,0 10,0 C15.5,0 20,4.5 20,10 C20,10.375 19.75,10.625 19.375,10.625 C19,10.625 18.75,10.375 18.75,10 C18.75,5.125 14.875,1.25 10,1.25 C5.125,1.25 1.25,5.125 1.25,10 C1.25,14.875 5.125,18.75 10,18.75 C10.375,18.75 10.625,19 10.625,19.375 C10.625,19.75 10.375,20 10,20 Z"
              transform="translate(10.000000, 10.000000) scale(-1, -1) rotate(90.000000) translate(-10.000000, -10.000000) "
            />
            <path d="M9.49931316,9.35945388 L16.3255193,2.53324771 C16.5950557,2.26371129 17.0320606,2.26371129 17.3015971,2.53324771 C17.5711331,2.80278375 17.5711331,3.23978801 17.3015971,3.50932404 C17.3015968,3.50932428 17.3015966,3.50932451 17.3015964,3.50932474 L10.4753916,10.33551 C10.2058568,10.6050439 9.76885618,10.6050461 9.49931874,10.3355149 C9.2297854,10.0659877 9.2297804,9.6289928 9.49930757,9.35945946 C9.49930943,9.3594576 9.49931129,9.35945574 9.49931316,9.35945388 Z" />
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}
AccountDeposit.propTypes = {
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
