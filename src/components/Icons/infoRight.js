import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function InfoRight(props) {
  const { className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-info-right`} {...rest}>
      <svg width="24px" height="122px" viewBox="0 0 24 122" version="1.1">
        <defs>
          <rect id="path-1" x="0" y="0" width="18" height="120" rx="8"></rect>
          <filter
            x="-55.6%"
            y="-6.7%"
            width="211.1%"
            height="116.7%"
            filterUnits="objectBoundingBox"
            id="filter-2"
          >
            <feOffset
              dx="0"
              dy="2"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            ></feOffset>
            <feGaussianBlur
              stdDeviation="3"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            ></feGaussianBlur>
            <feComposite
              in="shadowBlurOuter1"
              in2="SourceAlpha"
              operator="out"
              result="shadowBlurOuter1"
            ></feComposite>
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.03 0"
              type="matrix"
              in="shadowBlurOuter1"
            ></feColorMatrix>
          </filter>
        </defs>
        <g
          id="arrow-big-right"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="arrow-next" transform="translate(3.000000, 1.000000)">
            <g id="矩形">
              <use
                fill="black"
                fillOpacity="1"
                filter="url(#filter-2)"
                xlinkHref="#path-1"
              ></use>
              <use
                fillOpacity="0.06"
                fill="#FFFFFF"
                fillRule="evenodd"
                xlinkHref="#path-1"
              ></use>
            </g>
            <path
              d="M7.48024806,64.9944793 C7.35194406,64.976171 7.23249041,64.9127983 7.1428323,64.8114226 C6.95422894,64.5975911 6.95417265,64.2781565 7.1321968,64.0648975 L7.1851562,64.0095275 L11.0167584,60.4995405 L7.18525559,56.9901264 C6.97484857,56.7978389 6.94165399,56.4801997 7.09625815,56.2486955 L7.14308704,56.1878524 C7.33258526,55.9742798 7.64371372,55.940881 7.87125693,56.0975919 L7.93108763,56.1450522 L12.2261535,60.0779462 C12.3426302,60.186218 12.4097707,60.3394927 12.4097707,60.4997815 C12.4097707,60.6333555 12.3631453,60.7620586 12.2797846,60.8642879 L12.2254391,60.9222759 L7.93137445,64.8542474 C7.84879669,64.9303193 7.74718895,64.9779578 7.63966873,64.9939704 L7.55812494,65 L7.48024806,64.9944793 Z"
              id="更多-箭头"
              fill="currentColor"
              fillRule="nonzero"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

InfoRight.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

const StyledSpan = styled.div`
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  color: ${(props) => props.theme.t_b7b};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.blue};
  }
`;
