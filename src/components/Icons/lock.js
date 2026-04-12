import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconLock(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-lock`} {...rest}>
      <svg
        width={size || 16}
        height={size || 16}
        viewBox="0 0 14 16"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="A0-顶部导航"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="账户-锁定-1" transform="translate(-1747.000000, -109.000000)">
            <g id="账号下拉" transform="translate(1613.000000, 65.000000)">
              <g id="资产桥" transform="translate(20.000000, 14.000000)">
                <g id="编组-11" transform="translate(114.000000, 30.000000)">
                  <g id="锁定-icon" transform="translate(0.000000, 0.597333)">
                    <rect
                      id="矩形"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      x="0.6"
                      y="5.96"
                      width="12.8"
                      height="8.8"
                      rx="1.4"
                    ></rect>
                    <g id="编组-4" transform="translate(5.600000, 7.852667)">
                      <circle
                        id="椭圆形"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        cx="1.36"
                        cy="1.64571429"
                        r="1.36"
                      ></circle>
                      <rect
                        id="矩形"
                        fill="currentColor"
                        x="0.674285714"
                        y="2.57142857"
                        width="1.37142857"
                        height="2.8"
                        rx="0.685714286"
                      ></rect>
                    </g>
                    <path
                      d="M3,5.31266667 L3,4.19266667 C3,2.02771045 4.75504378,0.272666667 6.92,0.272666667 C9.08495622,0.272666667 10.84,2.02771045 10.84,4.19266667 L10.84,5.31266667"
                      id="路径"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
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

IconLock.propTypes = {
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
