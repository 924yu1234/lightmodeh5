import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconAccountUser(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-accountUser`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 30 30"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1755.000000, -26.000000)">
            <g>
              <g transform="translate(1755.000000, 26.000000)">
                <g transform="translate(1.000000, 1.000000)">
                  <mask fill="currentColor">
                    <use xlinkHref="#path-1" />
                  </mask>
                  <circle
                    stroke="currentColor"
                    strokeWidth="1.4"
                    cx="13"
                    cy="13"
                    r="12.3"
                  />
                  <path
                    d="M20.4171429,17.24 L20.5661872,18.0975156 C20.7553361,19.1857695 20.0264675,20.221309 18.9382137,20.4104579 C18.8251116,20.4301161 18.710527,20.44 18.5957293,20.44 L7.77760402,20.44 C6.67303452,20.44 5.77760402,19.5445695 5.77760402,18.44 C5.77760402,18.3252023 5.78748788,18.2106177 5.80714609,18.0975156 L5.95619048,17.24 C6.24599904,15.5726083 7.57908812,14.3109614 9.21428871,14.078518 C10.2461822,14.9845617 11.5990048,15.5333333 13.08,15.5333333 C14.5726222,15.5333333 15.9350515,14.9759113 16.9704737,14.0578812 C18.6906749,14.2149821 20.1162425,15.5087925 20.4171429,17.24 Z"
                    fill="currentColor"
                    mask="url(#mask-2)"
                  />
                  <circle
                    fill="currentColor"
                    mask="url(#mask-2)"
                    cx="13.1"
                    cy="9.6"
                    r="4.8"
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

IconAccountUser.propTypes = {
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
