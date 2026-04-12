import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function MediumIcon(props) {
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
          <g transform="translate(-1448.000000, -4433.000000)">
            <g transform="translate(-13.000000, 3821.000000)">
              <g transform="translate(372.000000, 563.000000)">
                <g transform="translate(889.000000, 1.000000)">
                  <g transform="translate(0.000000, 46.000000)">
                    <g transform="translate(200.000000, 2.000000)">
                      <mask fill="white">
                        <use xlinkHref="#path-1" />
                      </mask>
                      <g />
                      <path
                        d="M20,0.347859218 L18.4053139,1.91671826 C18.265832,2.02586084 18.199323,2.20328301 18.2258586,2.37389468 L18.2258586,13.9224016 C18.199323,14.0998238 18.265832,14.277246 18.4053139,14.379578 L19.9668305,15.9484371 L19.9668305,16.2962963 L12.1262481,16.2962963 L12.1262481,15.9620581 L13.7408359,14.3521614 C13.9003895,14.1885349 13.9003895,14.1406868 13.9003895,13.8951596 L13.9003895,4.5567462 L9.40856283,16.2622438 L8.80402796,16.2622438 L3.57464832,4.5567462 L3.57464832,12.401216 C3.52821106,12.7286438 3.64115736,13.0630566 3.86704996,13.3017733 L5.96676249,15.9143846 L5.96676249,16.2622438 L0,16.2622438 L0,15.9143846 L2.09971253,13.3017733 C2.32560513,13.0630566 2.42528364,12.7286438 2.37204239,12.401216 L2.37204239,3.32876125 C2.39857797,3.07642362 2.30570345,2.83089648 2.11961421,2.6602848 L0.252428175,0.347859218 L0.252428175,0 L6.05317321,0 L10.531562,10.095601 L14.4717549,0.00681049674 L20,0.00681049674 L20,0.347859218 Z"
                        fill="currentColor"
                        mask="url(#mask-2)"
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
MediumIcon.propTypes = {
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
  -webkit-font-smoothing: antialiased;
`;
