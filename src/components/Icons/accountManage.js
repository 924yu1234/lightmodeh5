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
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1632.000000, -282.000000)">
            <g transform="translate(1613.000000, 65.000000)">
              <g transform="translate(0.000000, 197.000000)">
                <rect opacity="0" x="0" y="0" width="170" height="60" />
                <g transform="translate(19.000000, 20.000000)">
                  <g>
                    <mask fill="currentColor">
                      <use xlinkHref="#path-1" />
                    </mask>
                    <circle
                      stroke="currentColor"
                      strokeWidth="1.4"
                      cx="10"
                      cy="10"
                      r="9.3"
                    />
                    <g
                      mask="url(#mask-2)"
                      fill="currentColor"
                      fillRule="nonzero"
                      stroke="currentColor"
                      strokeWidth="0.2"
                    >
                      <g transform="translate(4.350000, 3.600000)">
                        <path d="M5.56636364,8.60454545 C3.195,8.60454545 1.26545455,6.675 1.26545455,4.30363636 C1.26545455,1.93227273 3.195,0.00272727273 5.56636364,0.00272727273 C7.93772727,0.00272727273 9.86727273,1.93227273 9.86727273,4.30363636 C9.86727273,6.675 7.93772727,8.60454545 5.56636364,8.60454545 Z M5.56636364,1.22181818 C3.86727273,1.22181818 2.48590909,2.60454545 2.48590909,4.30363636 C2.48590909,6.00272727 3.86863636,7.38409091 5.56636364,7.38409091 C7.26409091,7.38409091 8.64818182,6.00136364 8.64818182,4.30363636 C8.64681818,2.60454545 7.26545455,1.22181818 5.56636364,1.22181818 Z" />
                        <path d="M9.39545455,12.1977273 L1.73727273,12.1977273 C1.18227273,12.1977273 0.657272727,11.9427273 0.331363636,11.5159091 C0.0245454545,11.1136364 -0.075,10.6077273 0.0572727273,10.1263636 C0.500454545,8.51181818 2.05227273,7.38409091 3.83045455,7.38409091 L7.30090909,7.38409091 C9.07909091,7.38409091 10.6309091,8.51181818 11.0740909,10.125 C11.2063636,10.6063636 11.1068182,11.1136364 10.8,11.5145455 C10.4740909,11.9427273 9.94909091,12.1977273 9.39545455,12.1977273 Z M3.83045455,8.60454545 C2.59909091,8.60454545 1.53136364,9.36272727 1.23272727,10.4495455 C1.19318182,10.5940909 1.24772727,10.7072727 1.30090909,10.7768182 C1.39772727,10.9036364 1.56,10.9786364 1.73590909,10.9786364 L9.39545455,10.9786364 C9.57136364,10.9786364 9.735,10.9036364 9.83045455,10.7768182 C9.88363636,10.7072727 9.93818182,10.5940909 9.89863636,10.4495455 C9.6,9.36272727 8.53227273,8.60454545 7.30090909,8.60454545 L3.83045455,8.60454545 Z" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
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
