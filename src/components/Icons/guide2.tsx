import React from 'react';
import styled from 'styled-components';

export default function IconGuide2({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-guide2`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.79905 0.0939902C7.77377 -0.251261 8.82629 0.392961 8.93371 1.39969H3.11279L6.79905 0.0939902Z"
          fill="#00A0FF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.54248 1.99969C10.4261 1.99969 11.1425 2.71606 11.1425 3.59974V10.3999C11.1425 11.2836 10.4261 12 9.54248 12H1.94248C1.72157 12 1.54248 11.8209 1.54248 11.6V2.39971C1.54248 2.17878 1.72157 1.99969 1.94248 1.99969H9.54248ZM6.25677 7.71427H3.68534C3.44864 7.71427 3.25677 7.90615 3.25677 8.14284C3.25677 8.37954 3.44864 8.57141 3.68534 8.57141H6.25677C6.49346 8.57141 6.68534 8.37954 6.68534 8.14284C6.68534 7.90615 6.49346 7.71427 6.25677 7.71427ZM8.82819 5.99999H3.68534C3.44864 5.99999 3.25677 6.19186 3.25677 6.42856C3.25677 6.66525 3.44864 6.85713 3.68534 6.85713H8.82819C9.06489 6.85713 9.25677 6.66525 9.25677 6.42856C9.25677 6.19186 9.06489 5.99999 8.82819 5.99999ZM8.82819 4.2857H3.68534C3.44864 4.2857 3.25677 4.47758 3.25677 4.71427C3.25677 4.95097 3.44864 5.14284 3.68534 5.14284H8.82819C9.06489 5.14284 9.25677 4.95097 9.25677 4.71427C9.25677 4.47758 9.06489 4.2857 8.82819 4.2857Z"
          fill="#00A0FF"
        />
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

  color: ${({ theme }) => theme.t_b7b_40};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.t_b7b_40};
  }
`;
