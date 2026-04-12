import React from 'react';
import styled from 'styled-components';

export default function IconStar({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-star`}
      onClick={onClick}
      {...rest}
    >
      <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1">
        <title>star</title>
        <defs>
          <polygon
            id="path-1"
            points="-1.7906823e-16 0 10.3914882 0 10.3914882 12 -1.7906823e-16 12"
          ></polygon>
        </defs>
        <g
          id="star"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="编组" transform="translate(1, 0)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
            </mask>
            <g id="Clip-2"></g>
            <path
              d="M6.83411983,8.21598034 L5.70922064,11.6285937 C5.54598979,12.1238054 4.84549836,12.1238054 4.68226752,11.6285937 L3.55735572,8.21596774 C3.46729776,7.94275706 3.25299584,7.72845514 2.97978516,7.63839718 L0.623182334,6.86158266 C-0.207727445,6.58769153 -0.207727445,5.41231351 0.623182334,5.13840978 L2.97978516,4.36160786 C3.25299584,4.2715499 3.46729776,4.05724798 3.55735572,3.7840373 L4.68226752,0.37139869 C4.84549836,-0.123800403 5.54598979,-0.123800403 5.70922064,0.37139869 L6.83411983,3.7840373 C6.9241778,4.05724798 7.13847971,4.2715499 7.4116904,4.36160786 L9.76830582,5.13840978 C10.5992156,5.41231351 10.5992156,6.58769153 9.76830582,6.86158266 L7.4117156,7.63838458 C7.13849231,7.72845514 6.9241778,7.94275706 6.83411983,8.21598034"
              id="Fill-1"
              fill="currentColor"
              mask="url(#mask-2)"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.div`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  color: ${({ theme }) => theme.blue};
`;
