import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function AccountTransfer(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan
      className={`${className} dg-icon icon-accountTransfer`}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-40.000000, -314.000000)">
            <g transform="translate(0.000000, 81.000000)">
              <g transform="translate(0.000000, 210.000000)">
                <g transform="translate(40.000000, 23.000000)">
                  <g>
                    <g transform="translate(1.500000, 0.000000)">
                      <g fill="currentColor" fillRule="nonzero">
                        <path d="M20.25,16.5 L15.75,16.5 C15.3,16.5 15,16.8 15,17.25 C15,17.7 15.3,18 15.75,18 L19.05,18 C17.1,20.85 13.8,22.5 10.5,22.5 C7.2,22.5 4.05,21 2.1,18.3 C1.8,18 1.35,17.85 1.05,18.15 C0.75,18.45 0.6,18.9 0.9,19.2 C3.15,22.2 6.75,24 10.5,24 C13.95,24 17.25,22.5 19.5,19.95 L19.5,21.75 C19.5,22.2 19.8,22.5 20.25,22.5 C20.7,22.5 21,22.2 21,21.75 L21,17.25 C21,16.8 20.7,16.5 20.25,16.5 Z M6,6.75 C6,6.3 5.7,6 5.25,6 L1.95,6 C3.9,3.15 7.05,1.5 10.5,1.5 C13.8,1.5 16.95,3.15 18.9,5.7 C19.2,6 19.65,6.15 19.95,5.85 C20.25,5.55 20.4,5.1 20.1,4.8 C17.85,1.8 14.25,0 10.5,0 C7.05,0 3.75,1.5 1.5,4.05 L1.5,2.25 C1.5,1.8 1.2,1.5 0.75,1.5 C0.3,1.5 0,1.8 0,2.25 L0,6.75 C0,7.2 0.3,7.5 0.75,7.5 L5.25,7.5 C5.7,7.5 6,7.2 6,6.75 Z" />
                      </g>
                      <rect
                        stroke="currentColor"
                        strokeWidth="1.4"
                        x="7"
                        y="9"
                        width="7"
                        height="7"
                        rx="1"
                      />
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
AccountTransfer.propTypes = {
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
