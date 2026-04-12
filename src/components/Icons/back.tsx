import React from 'react';
import styled from 'styled-components';

export default function IconBack({
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
      className={`${className} dg-icon icon-back`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 16}
        height={size || 16}
        viewBox="0 0 20 20"
        version="1.1"
      >
        <title>button_back</title>
        <g
          id="button_back"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <path
            d="M17.1195351,16.1195351 L8,16.1195351 C7.44771525,16.1195351 7,15.6718199 7,15.1195351 L7,6 C7,5.44771525 7.44771525,5 8,5 L8.77763286,5 C9.32991761,5 9.77763286,5.44771525 9.77763286,6 L9.77763286,12.3374004 C9.77763286,12.8896852 10.2253481,13.3374004 10.7776329,13.3374004 L17.1195351,13.3374004 C17.6718199,13.3374004 18.1195351,13.7851157 18.1195351,14.3374004 L18.1195351,15.1195351 C18.1195351,15.6718199 17.6718199,16.1195351 17.1195351,16.1195351 Z"
            id="路径-2"
            fill="currentColor"
            fillRule="nonzero"
            transform="translate(12.5598, 10.5598) rotate(45) translate(-12.5598, -10.5598)"
          ></path>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.div`
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;

  color: ${({ theme }) => theme.t_b7b};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
