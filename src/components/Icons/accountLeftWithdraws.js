import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function AccountLeftWithdraws(props) {
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
          <g
            transform="translate(-0.000000, 0.000000)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <path
              d="M10,20 C4.5,20 0,15.5 0,10 C0,4.5 4.5,0 10,0 C15.5,0 20,4.5 20,10 C20,10.375 19.75,10.625 19.375,10.625 C19,10.625 18.75,10.375 18.75,10 C18.75,5.125 14.875,1.25 10,1.25 C5.125,1.25 1.25,5.125 1.25,10 C1.25,14.875 5.125,18.75 10,18.75 C10.375,18.75 10.625,19 10.625,19.375 C10.625,19.75 10.375,20 10,20 Z"
              transform="translate(10.000000, 10.000000) scale(-1, -1) rotate(90.000000) translate(-10.000000, -10.000000) "
            />
            <path
              d="M17.3995979,7.26200581 L13.5727049,7.26200581 C13.0204202,7.26200581 12.5727049,6.81429056 12.5727049,6.26200581 L12.5727049,2.43399598 C12.5727049,2.05342898 12.8812154,1.74491847 13.2617824,1.74491847 C13.6423494,1.74491847 13.95086,2.05342898 13.95086,2.43399598 L13.95086,4.88161715 C13.95086,5.4339019 14.3985752,5.88161715 14.95086,5.88161715 L17.3995979,5.88161715 C17.7807817,5.88161715 18.0897923,6.19062768 18.0897923,6.57181148 C18.0897923,6.95299528 17.7807817,7.26200581 17.3995979,7.26200581 Z"
              transform="translate(15.331249, 4.503462) scale(-1, -1) translate(-15.331249, -4.503462) "
            />
            <path d="M9.49931316,9.35945388 L16.3255193,2.53324771 C16.5950557,2.26371129 17.0320606,2.26371129 17.3015971,2.53324771 C17.5711331,2.80278375 17.5711331,3.23978801 17.3015971,3.50932404 C17.3015968,3.50932428 17.3015966,3.50932451 17.3015964,3.50932474 L10.4753916,10.33551 C10.2058568,10.6050439 9.76885618,10.6050461 9.49931874,10.3355149 C9.2297854,10.0659877 9.2297804,9.6289928 9.49930757,9.35945946 C9.49930943,9.3594576 9.49931129,9.35945574 9.49931316,9.35945388 Z" />
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}
AccountLeftWithdraws.propTypes = {
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
