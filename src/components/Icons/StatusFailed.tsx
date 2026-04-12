import React from 'react';
import styled from 'styled-components';

export default function IconStatusFailed({
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
      className={`${className} dg-icon icon-status-failed`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 14 14"
        version="1.1"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill="#E35782" fillRule="nonzero">
            <g>
              <path d="M7,0 C3.13401367,0 0,3.13401367 0,7 C0,10.8660176 3.13401367,14 7,14 C10.8660176,14 14,10.8660176 14,7 C14,3.13399805 10.8660176,0 7,0 Z M9.77980313,9.08582845 C9.9713392,9.27750509 9.9713392,9.58825144 9.77980313,9.77967819 C9.5879547,9.97135482 9.27734891,9.97135482 9.08553172,9.77967819 L7.00342029,7.69756675 L4.9211683,9.77967819 C4.72947605,9.97135482 4.41887026,9.97135482 4.22703745,9.77967819 C4.03547014,9.58826705 4.03547014,9.27750509 4.22703745,9.08582845 L6.30941438,7.00315479 L4.22703745,4.92102774 C4.03547014,4.72961661 4.03547014,4.41860475 4.22703745,4.2269125 C4.41885464,4.03550137 4.72946043,4.03550137 4.9211683,4.2269125 L7.00342029,6.30930505 L9.08553172,4.2269125 C9.27734891,4.03550137 9.5879547,4.03550137 9.77978751,4.2269125 C9.9713392,4.41860475 9.9713392,4.72964784 9.77978751,4.92102774 L7.69739496,7.00315479 L9.77978751,9.08582845 L9.77980313,9.08582845 Z"></path>
            </g>
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
`;
