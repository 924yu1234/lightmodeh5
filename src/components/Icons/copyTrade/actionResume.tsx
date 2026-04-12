import React from 'react';
import styled from 'styled-components';

export default function IconActionResume({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-action-resume`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 50}
        height={size || 50}
        viewBox="0 0 50 50"
        version="1.1"
      >
        <g
          id="popup_resume"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon" fillRule="nonzero">
            <g
              id="成功-(1)"
              transform="translate(0.0003, 0.0003)"
              fill="#50E4A2"
            >
              <path
                d="M24.999707,0 C11.1927246,0 0,11.1927246 0,24.999707 C0,38.8066895 11.1927246,49.9994141 24.999707,49.9994141 C38.8066895,49.9994141 49.9994141,38.8066895 49.9994141,24.999707 C49.9994141,11.1927246 38.8066895,0 24.999707,0 Z"
                id="形状"
              ></path>
            </g>
            <path
              d="M14.0011406,26.2438633 C13.913978,20.1570128 18.833819,15.1790634 24.8964577,15.1645363 L24.8964577,13 L28.0536785,16.1572208 C28.3587474,16.4622897 28.3587474,16.9562107 28.0536785,17.266122 L24.8964577,20.4233427 L24.8964577,18.2636488 C20.0444098,18.2781759 16.2237853,22.7283076 17.2794204,27.7643653 C17.8992429,30.7133645 20.286528,33.1006495 23.2355271,33.720472 C28.019782,34.7276836 32.2810616,31.3186599 32.7023471,26.8152621 C32.7410861,26.4036613 33.060682,26.0792229 33.4722829,26.0792229 L35.0218391,26.0792229 C35.4673365,26.0792229 35.8401985,26.4520849 35.8111443,26.8975823 C35.3850163,32.5970438 30.5765497,37.0859144 24.7560292,36.9987519 C18.9645628,36.9164317 14.0883031,32.0353296 14.0011406,26.2438633 Z"
              id="路径"
              stroke="#FFFFFF"
              fill="#FFFFFF"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  color: ${({ theme }) => theme.buy};
`;
