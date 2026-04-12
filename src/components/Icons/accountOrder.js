import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function AccountOrder(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-accountOrder`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1632.000000, -222.000000)">
            <g transform="translate(1613.000000, 65.000000)">
              <g transform="translate(0.000000, 137.000000)">
                <rect opacity="0" x="0" y="0" width="170" height="60" />
                <g transform="translate(19.000000, 21.000000)">
                  <g transform="translate(0.000000, 1.000000)">
                    <rect
                      stroke="currentColor"
                      strokeWidth="1.4"
                      x="0.7"
                      y="2.7"
                      width="15.4"
                      height="14.6"
                      rx="2"
                    />
                    <g
                      transform="translate(3.400000, 0.000000)"
                      fill="currentColor"
                    >
                      <rect
                        transform="translate(1.000000, 2.700000) rotate(90.000000) translate(-1.000000, -2.700000) "
                        x="-1"
                        y="2"
                        width="4"
                        height="1.4"
                        rx="0.7"
                      />
                      <rect
                        transform="translate(9.000000, 2.700000) rotate(90.000000) translate(-9.000000, -2.700000) "
                        x="7"
                        y="2"
                        width="4"
                        height="1.4"
                        rx="0.7"
                      />
                    </g>
                    <rect
                      fill="currentColor"
                      x="3.36842105"
                      y="9.5"
                      width="10.2631579"
                      height="1.4"
                      rx="0.7"
                    />
                    <rect
                      fill="currentColor"
                      x="3.36842105"
                      y="12.5"
                      width="6"
                      height="1.4"
                      rx="0.7"
                    />
                    <rect
                      fill="currentColor"
                      x="3.36842105"
                      y="6.5"
                      width="10.2631579"
                      height="1.4"
                      rx="0.7"
                    />
                  </g>
                  <path
                    d="M6.47368421,0 L17.5263158,0 C18.3402091,0 19,0.659790895 19,1.47368421 L19,12.5263158"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}
AccountOrder.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};
const StyledSpan = styled.div`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
`;
