import React from 'react';
import styled from 'styled-components';

export default function IconChoose(props: { className?: string }) {
  const { className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-choose`} {...rest}>
      <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1">
        <title>icon choose</title>
        <g
          id="icon-choose"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M5.62785645,11.3419736 C5.39903613,11.5707939 5.09910645,11.6852158 4.79922363,11.6852158 C4.49931738,11.6852158 4.19941113,11.5707939 3.97059082,11.3419736 L0.343239258,7.71464551 C-0.114401367,7.25700488 -0.114424805,6.51499707 0.343239258,6.05737988 C0.800879883,5.59973926 1.54286426,5.59971582 2.00052832,6.05737988 L4.79922363,8.85605176 L11.3119893,2.34323926 C11.7696064,1.88559863 12.5116143,1.8855752 12.9692783,2.34323926 C13.4269189,2.80085645 13.4269189,3.54284082 12.9692549,4.00048145 L5.62785645,11.3419736 Z"
            id="路径"
            fill="#50E4A2"
            fillRule="nonzero"
          ></path>
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

  color: ${({ theme }) => theme.t_b7b};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;
