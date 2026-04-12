import React from 'react';
import styled from 'styled-components';

export default function IconFeedbackTelgram({
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
      className={`${className} dg-icon icon-feedback-telgram`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        version="1.1"
      >
        <g
          id="Feedback-Telegram"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="telegram" fillRule="nonzero">
            <circle id="Oval" fill="#00A0FF" cx="10" cy="10" r="10"></circle>
            <path
              d="M7.82949079,15.391915 L8.02456813,12.3436052 L13.5520379,7.34952544 C13.8120853,7.15490403 13.4870121,7.02519344 13.1618832,7.21975932 L6.39886794,11.5004308 L3.47254079,10.5275459 C2.82228298,10.33298 2.82228298,9.87893742 3.60264802,9.55466096 L15.1127123,5.0794791 C15.6329742,4.8200024 16.1531804,5.20918969 15.9580474,6.05230851 L14.0072183,15.3270597 C13.8771111,15.9756682 13.4870121,16.1702341 12.9017244,15.8459576 L9.91037145,13.6407666 L8.47980427,15.0676386 C8.28467126,15.2622044 8.15461969,15.391915 7.82949079,15.391915"
              id="Fill-1"
              fill="#FFFFFF"
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
`;
