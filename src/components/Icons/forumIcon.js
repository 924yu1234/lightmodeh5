import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ForumIcon(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-forum`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1328.000000, -4431.000000)">
            <g transform="translate(-13.000000, 3821.000000)">
              <g transform="translate(372.000000, 563.000000)">
                <g transform="translate(889.000000, 1.000000)">
                  <g transform="translate(0.000000, 46.000000)">
                    <g transform="translate(80.000000, 0.000000)">
                      <mask fill="white">
                        <use xlinkHref="#path-1"></use>
                      </mask>
                      <g />
                      <g mask="url(#mask-2)" fill="currentColor">
                        <polyline points="8.25432538 16.3683733 8.25432538 5.74772237 13.2594448 5.74772237 13.2594448 7.86355722 10.3946811 7.86355722 10.3946811 9.74357469 13.0152799 9.74357469 13.0152799 11.8758437 10.3946811 11.8758437 10.3946811 16.3683733 8.25432538 16.3683733" />
                        <path
                          d="M10.0039129,1.45866348 L18.5413365,10.0041738 L10.0039129,18.5410757 L1.467011,10.0041738 L10.0039129,1.45866348 Z M10.9317917,0.384442314 L19.6155577,9.06820835 C20.1281474,9.5807981 20.1281474,10.4192019 19.6155577,10.9317917 L10.9317917,19.6155577 C10.4192019,20.1281474 9.5807981,20.1281474 9.06820835,19.6155577 L0.384442314,10.9317917 C-0.128147438,10.4192019 -0.128147438,9.5807981 0.384442314,9.06820835 L9.06820835,0.384442314 C9.5807981,-0.128147438 10.4192019,-0.128147438 10.9317917,0.384442314 L10.9317917,0.384442314 Z"
                          id="Fill-8"
                        />
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
ForumIcon.propTypes = {
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
