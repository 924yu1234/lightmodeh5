import React from 'react';
import styled from 'styled-components';

export default function IconActionAnalytics({
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
      className={`${className} dg-icon icon-m_analytics`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 30}
        height={size || 30}
        viewBox="0 0 30 30"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="tab_middle_analytics"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g fill="#00A0FF" fillRule="nonzero" id="形状">
            <path d="M15,30 C6.71572875,30 0,23.2842712 0,15 C0,6.71572875 6.71572875,0 15,0 C15.5917337,0 16.0714286,0.479694911 16.0714286,1.07142857 L16.0714286,13.9285714 L28.9285714,13.9285714 C29.5203051,13.9285714 30,14.4082663 30,15 C30,23.2842712 23.2842712,30 15,30 Z M13.8898822,2 C7.01687255,2.6011801 1.80498167,8.45758655 2.00560122,15.3539212 C2.20622077,22.2502558 7.74974415,27.7937792 14.6460788,27.9943988 C21.5424134,28.1950183 27.3988199,22.9831274 28,16.1101178 L14.9752759,16.1101178 C14.3758295,16.1101178 13.8898822,15.6241705 13.8898822,15.0247241 L13.8898822,2 Z"></path>
            <path d="M28.2535714,11.7857143 L19.2857143,11.7857143 C18.6939806,11.7857143 18.2142857,11.3060194 18.2142857,10.7142857 L18.2142857,1.74642857 C18.2168033,1.40729219 18.3797372,1.08937235 18.6535714,0.889285714 C18.9304059,0.683653098 19.289295,0.623838258 19.6178571,0.728571429 C24.187228,2.2191444 27.7701413,5.80205774 29.2607143,10.3714286 C29.3654475,10.6999907 29.3056326,11.0588798 29.1,11.3357143 C28.9044365,11.6106056 28.5908251,11.7773357 28.2535714,11.7857143 L28.2535714,11.7857143 Z"></path>
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
`;
