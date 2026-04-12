import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconUnlock(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-unlock`} {...rest}>
      <svg
        width={size || 16}
        height={size || 16}
        viewBox="0 0 14 16"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="链接后" transform="translate(-1747.000000, -109.000000)">
            <g id="账号下拉" transform="translate(1613.000000, 65.000000)">
              <g id="资产桥" transform="translate(20.000000, 14.000000)">
                <g id="解锁" transform="translate(114.000000, 30.000000)">
                  <g id="解锁-icon">
                    <g transform="translate(-0.000000, 0.597333)">
                      <rect
                        id="矩形"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        x="0.7"
                        y="6.06"
                        width="11.2"
                        height="8.6"
                        rx="1.4"
                      ></rect>
                      <g id="编组-4" transform="translate(4.900000, 7.852667)">
                        <circle
                          id="椭圆形"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          cx="1.56"
                          cy="1.64571429"
                          r="1.36"
                        ></circle>
                        <rect
                          id="矩形"
                          fill="currentColor"
                          x="0.9"
                          y="2.57142857"
                          width="1.4"
                          height="2.8"
                          rx="0.7"
                        ></rect>
                      </g>
                      <path
                        d="M7.8,5.63428571 L7.8,4.11428571 C7.8,1.99351227 9.4893693,0.274285714 11.5733119,0.274285714 C12.9647083,0.274285714 14.1802079,1.04069956 14.834424,2.18132942 C14.9895559,2.4518027 15.1131273,2.74331772 15.2,3.05064518"
                        id="路径"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
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

IconUnlock.propTypes = {
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
