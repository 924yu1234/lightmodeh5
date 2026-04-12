import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradeSignals({
  className,
  onClick,
  size,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-signals`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 24}
        height={size || 25}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.1998 7.2749H5.2798C5.01471 7.2749 4.7998 7.48981 4.7998 7.7549V16.3949C4.7998 16.66 5.01471 16.8749 5.2798 16.8749H7.1998C7.4649 16.8749 7.6798 16.66 7.6798 16.3949V7.7549C7.6798 7.48981 7.4649 7.2749 7.1998 7.2749Z"
          fill="#02FFAB"
        />
        <path d="M6.48 4.875H6V7.275H6.48V4.875Z" fill="#02FFAB" />
        <path d="M6.48 16.875H6V19.275H6.48V16.875Z" fill="#02FFAB" />
        <path
          d="M12.9596 9.67505H11.0396C10.7745 9.67505 10.5596 9.88995 10.5596 10.155V13.995C10.5596 14.2601 10.7745 14.475 11.0396 14.475H12.9596C13.2247 14.475 13.4396 14.2601 13.4396 13.995V10.155C13.4396 9.88995 13.2247 9.67505 12.9596 9.67505Z"
          fill="#02FFAB"
        />
        <path d="M12.2398 4.875H11.7598V9.675H12.2398V4.875Z" fill="#02FFAB" />
        <path
          d="M12.2398 14.4749H11.7598V19.2749H12.2398V14.4749Z"
          fill="#02FFAB"
        />
        <path
          d="M18.7203 7.2749H16.8003C16.5352 7.2749 16.3203 7.48981 16.3203 7.7549V16.3949C16.3203 16.66 16.5352 16.8749 16.8003 16.8749H18.7203C18.9854 16.8749 19.2003 16.66 19.2003 16.3949V7.7549C19.2003 7.48981 18.9854 7.2749 18.7203 7.2749Z"
          fill="#02FFAB"
        />
        <path d="M17.9995 4.875H17.5195V7.275H17.9995V4.875Z" fill="#02FFAB" />
        <path
          d="M17.9995 16.875H17.5195V19.275H17.9995V16.875Z"
          fill="#02FFAB"
        />
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  text-rendering: optimizelegibility;

  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;

  color: ${({ theme }) => theme.t_b7b};
`;
