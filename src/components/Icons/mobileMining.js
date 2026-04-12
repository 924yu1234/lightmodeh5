import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconMobileMining(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-mobileMining`} {...rest}>
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 14 14"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="S10首页"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="2076_3Mobile首页下拉菜单"
            transform="translate(-125.000000, -376.000000)"
            fill="currentColor"
          >
            <g id="assets-list" transform="translate(0.000000, 285.000000)">
              <g id="编组-4" transform="translate(0.000000, 73.000000)">
                <g id="icon-dig" transform="translate(125.000000, 18.000000)">
                  <circle
                    id="路径-2"
                    fillOpacity="0.15"
                    transform="translate(7.000000, 7.000000) scale(1, -1) translate(-7.000000, -7.000000) "
                    cx="7"
                    cy="7"
                    r="7"
                  ></circle>
                  <path
                    d="M9.14458559,7.37405439 L11.67006,10.779005 L12.4844577,8.46709678 L10.9368215,6.4074143 L10.3666497,6.19725837 L10.773755,5.56679059 L10.8147086,5.31456487 L10.6110625,5.10440893 C10.6110625,5.10440893 10.071372,4.43187137 9.46024651,4.50539699 L9.33813361,4.67348315 L9.2668855,4.71555293 L9.05295418,4.57892264 C9.05295418,4.57892264 6.79227591,2.08850734 3.31981877,1.98333289 L3.27905214,2.25659349 L7.78002533,5.87150703 L1.98445767,10.9070669 C1.81616407,11.4399804 1.92853422,11.8841526 2.32156814,12.2395835 C2.71460207,12.5950144 3.18262662,12.6761999 3.72564182,12.4831399 L9.14458559,7.37405439 Z"
                    id="路径"
                    transform="translate(7.196615, 7.284202) scale(1, -1) rotate(86.000000) translate(-7.196615, -7.284202) "
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconMobileMining.propTypes = {
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

  color: ${({ theme }) => theme.buy};
`;
