import React from 'react';
import styled from 'styled-components';

export default function IconNavMe({
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
      className={`${className} dg-icon icon-nav-me`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        version="1.1"
      >
        <title>web_me_on</title>
        <g
          id="web_me_on"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="team-(1)"
            transform="translate(0, 1)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <path
              d="M11.9969674,0 C18.6227095,0 23.9939348,5.37122526 23.9939348,11.9969674 C23.9939348,16.0085972 22.0249335,19.5603421 19.0006423,21.7384907 L19,17.6 C19,15.6117749 17.4329966,14 15.5,14 L8.5,14 C6.56700338,14 5,15.6117749 5,17.6 L5.00028045,21.7435197 C1.97203473,19.5658115 0,16.0116861 0,11.9969674 C0,5.37122526 5.37122526,0 11.9969674,0 Z M12,4 C9.790861,4 8,5.790861 8,8 C8,10.209139 9.790861,12 12,12 C14.209139,12 16,10.209139 16,8 C16,5.790861 14.209139,4 12,4 Z"
              id="椭圆形-2"
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
  cursor: pointer;
  color: ${(props) => props.theme.t_b7b};
`;
