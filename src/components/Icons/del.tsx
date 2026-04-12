import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export default function IconDel({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-del`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="icon_delete"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g
            id="Group-2"
            transform="translate(3.000000, 1.000000)"
            fill="currentColor"
          >
            <path d="M12.7180574,4 C13.1638168,4 13.3254599,4.04641281 13.4884229,4.13356635 C13.6513858,4.2207199 13.7792801,4.34861419 13.8664336,4.51157715 C13.9535872,4.67454011 14,4.83618323 14,5.2819426 L14,16.7180574 C14,17.1638168 13.9535872,17.3254599 13.8664336,17.4884229 C13.7792801,17.6513858 13.6513858,17.7792801 13.4884229,17.8664336 C13.3254599,17.9535872 13.1638168,18 12.7180574,18 L2.2819426,18 C1.83618323,18 1.67454011,17.9535872 1.51157715,17.8664336 C1.34861419,17.7792801 1.2207199,17.6513858 1.13356635,17.4884229 C1.04641281,17.3254599 1,17.1638168 1,16.7180574 L1,5.2819426 C1,4.83618323 1.04641281,4.67454011 1.13356635,4.51157715 C1.2207199,4.34861419 1.34861419,4.2207199 1.51157715,4.13356635 C1.67454011,4.04641281 1.83618323,4 2.2819426,4 L12.7180574,4 Z M7.5,6 C7.22385763,6 7,6.22385763 7,6.5 L7,6.5 L7,15.5 C7,15.7761424 7.22385763,16 7.5,16 C7.77614237,16 8,15.7761424 8,15.5 L8,15.5 L8,6.5 C8,6.22385763 7.77614237,6 7.5,6 Z M10.5,6 C10.7761424,6 11,6.22385763 11,6.5 L11,15.5 C11,15.7761424 10.7761424,16 10.5,16 C10.2238576,16 10,15.7761424 10,15.5 L10,6.5 C10,6.22385763 10.2238576,6 10.5,6 Z M4.5,6 C4.77614237,6 5,6.22385763 5,6.5 L5,15.5 C5,15.7761424 4.77614237,16 4.5,16 C4.22385763,16 4,15.7761424 4,15.5 L4,6.5 C4,6.22385763 4.22385763,6 4.5,6 Z"></path>
            <path d="M1,3 C0.44771525,3 -1.5440923e-16,2.55228475 0,2 C-6.76353751e-17,1.44771525 0.44771525,1 1,1 L5,1 C5,0.44771525 5.44771525,1.01453063e-16 6,0 L9,0 C9.55228475,-1.01453063e-16 10,0.44771525 10,1 L14,1 C14.5522847,1 15,1.44771525 15,2 C15,2.55228475 14.5522847,3 14,3 L1,3 Z"></path>
          </g>
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

  color: ${(props) => props.theme.t_3b415b};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  }
`;
