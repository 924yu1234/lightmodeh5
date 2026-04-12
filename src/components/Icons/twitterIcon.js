import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TwitterIcon(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-twitter`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1288.000000, -4433.000000)">
            <g transform="translate(-13.000000, 3821.000000)">
              <g transform="translate(372.000000, 563.000000)">
                <g transform="translate(889.000000, 1.000000)">
                  <g transform="translate(0.000000, 46.000000)">
                    <g transform="translate(40.000000, 2.000000)">
                      <mask fill="white">
                        <use xlinkHref="#path-1"></use>
                      </mask>
                      <g />
                      <path
                        d="M18.1890974,3.94708718 C18.1890974,11.0464718 13.5256103,16.1586769 6.6666359,16.3829846 C3.76602051,16.6073949 1.77884103,15.725959 -3.07692308e-05,14.3958051 C1.98714872,14.6202154 4.66345641,13.9630872 5.97750769,12.6169333 C3.99043077,12.6169333 2.86858462,11.4951897 2.21155897,9.97272821 L3.99043077,9.97272821 C2.21155897,9.29970256 0.865405128,7.96954872 0.865405128,5.75795897 C1.29812308,5.98236923 1.74684103,6.19067692 2.64427692,6.19067692 C1.08971282,5.30924103 0.208379487,2.42462564 1.31412308,0.64585641 C3.30130256,2.85734359 5.7372,4.86052308 9.75955897,5.06893333 C8.63781538,0.64585641 14.4230462,-1.59773333 16.8589436,1.30288205 C17.9807897,1.07847179 18.6378154,0.64585641 19.5032513,0.181035897 C19.278841,1.30288205 18.6218154,1.95990769 17.7243795,2.39262564 C18.6057128,2.39262564 19.278841,2.16821538 19.9358667,1.7356 C19.727559,2.61693333 18.8461231,3.51436923 18.1890974,3.94708718"
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
TwitterIcon.propTypes = {
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
