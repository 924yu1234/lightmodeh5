import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function YoutubeIcon(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-youtube`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            transform="translate(-1488.000000, -4433.000000)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <g transform="translate(-13.000000, 3821.000000)">
              <g transform="translate(372.000000, 563.000000)">
                <g transform="translate(889.000000, 1.000000)">
                  <g transform="translate(0.000000, 46.000000)">
                    <g transform="translate(240.000000, 2.000000)">
                      <path d="M19.581875,2.2 C20,3.77 20,7.045 20,7.045 C20,7.045 20,10.32 19.581875,11.89 C19.3521564,12.7560912 18.6783668,13.4341679 17.81375,13.669375 C16.254375,14.09 10,14.09 10,14.09 C10,14.09 3.745625,14.09 2.18625,13.669375 C1.32190069,13.4337084 0.64830476,12.7558266 0.418125,11.89 C0,10.32 0,7.045 0,7.045 C0,7.045 0,3.769375 0.418125,2.2 C0.647843603,1.33390879 1.32163318,0.655832106 2.18625,0.420625 C3.745625,0 10,0 10,0 C10,0 16.254375,0 17.81375,0.420625 C18.678233,0.656061997 19.3519257,1.33404115 19.581875,2.2 Z M7.954375,10.01875 L13.181875,7.045 L7.954375,4.07125 L7.954375,10.01875 Z" />
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
YoutubeIcon.propTypes = {
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
