import React from 'react';
import styled from 'styled-components';

export default function IconDown({
  className,
  size,
  onClick,
  rotate,
  ...rest
}: {
  className?: string;
  size?: number;
  rotate?: boolean;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-down ${rotate ? 'show' : ''}`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 16}
        height={size || 16}
        viewBox="0 0 22 22"
        version="1.1"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            transform="translate(-854.000000, -458.000000)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <g transform="translate(-79.000000, -136.000000)">
              <g transform="translate(537.000000, 475.000000)">
                <g transform="translate(30.000000, 104.000000)">
                  <g transform="translate(93.000000, 11.000000)">
                    <g transform="translate(272.132231, 3.714286)">
                      <g transform="translate(0.867769, 0.285714)">
                        <path
                          d="M7.54568289,17.5249092 C7.34645883,17.4969723 7.16097715,17.4002707 7.0217605,17.2455796 C6.7289066,16.9192902 6.7288192,16.4318592 7.00524623,16.1064434 L7.08747894,16.0219533 L13.037,10.666 L7.08763328,5.31092101 C6.76092374,5.01750608 6.70938085,4.53281453 6.94944248,4.17955805 L7.02215604,4.08671655 C7.31639944,3.76082216 7.79950421,3.70985835 8.15282197,3.94898638 L8.2457241,4.02140686 L14.9148884,10.0226817 C15.0957476,10.1878956 15.2,10.4217802 15.2,10.6663678 C15.2,10.8701908 15.1276025,11.0665812 14.9981641,11.2225748 L14.9137791,11.3110597 L8.24616945,17.3109267 C8.11794684,17.4270062 7.96017539,17.4996987 7.79322336,17.5241326 L7.66660622,17.5333333 L7.54568289,17.5249092 Z"
                          transform="translate(10.999989, 10.666701) rotate(90.000000) translate(-10.999989, -10.666701) "
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
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

  color: ${({ theme }) => theme.t_b7b_60};

  &.show {
    transform: rotate(180deg);
  }
`;
