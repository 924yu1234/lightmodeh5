import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TelegramIcon(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-telegram`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1408.000000, -4432.000000)">
            <g transform="translate(-13.000000, 3821.000000)">
              <g transform="translate(372.000000, 563.000000)">
                <g transform="translate(889.000000, 1.000000)">
                  <g transform="translate(0.000000, 46.000000)">
                    <g transform="translate(160.000000, 1.000000)">
                      <path
                        d="M7.41435043,15.9958291 L7.71383761,11.3036923 L16.199735,3.61651282 C16.5989658,3.31694017 16.099906,3.11728205 15.6007607,3.41676923 L5.21802564,10.0058291 L0.725461538,8.50830769 C-0.27282906,8.20882051 -0.27282906,7.50993162 0.925205128,7.01078632 L18.5957179,0.122324786 C19.3944359,-0.277076923 20.1930684,0.321982906 19.8934957,1.61976068 L16.8985385,15.896 C16.6987949,16.8943761 16.099906,17.1938632 15.201359,16.6947179 L10.6089658,13.300359 L8.4127265,15.4966838 C8.11315385,15.7961709 7.91349573,15.9958291 7.41435043,15.9958291"
                        fill="currentColor"
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
TelegramIcon.propTypes = {
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
