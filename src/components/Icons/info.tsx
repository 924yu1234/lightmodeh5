import React from 'react';
import styled from 'styled-components';

export default function IconInfo(props: {
  className?: string;
  size?: number;
  onClick?: (e: any) => void;
}) {
  const { size, className, onClick, ...rest } = props;
  return (
    <StyledSpan
      className={`${className} dg-icon icon-info`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 12} height={size || 12} viewBox="0 0 12 12">
        <g
          id="iconinfo-white"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="info-icon" fill="currentColor" fillRule="nonzero">
            <path d="M6,0 C2.6862915,0 0,2.6862915 0,6 C0,9.3137085 2.6862915,12 6,12 C9.3137085,12 12,9.3137085 12,6 C12,2.6862915 9.3137085,0 6,0 Z M6,0.857142857 C8.84032157,0.857142857 11.1428571,3.15967843 11.1428571,6 C11.1428571,8.84032157 8.84032157,11.1428571 6,11.1428571 C3.15967843,11.1428571 0.857142857,8.84032157 0.857142857,6 C0.857142857,3.15967843 3.15967843,0.857142857 6,0.857142857 Z"></path>
            <path d="M6.07173554,4.01 C6.35272727,4.01 6.58413223,3.90915966 6.78247934,3.72428571 C6.98082645,3.52260504 7.08,3.28731092 7.08,3.00159664 C7.08,2.69907563 6.98082645,2.46378151 6.78247934,2.29571429 C6.58413223,2.09403361 6.35272727,2.01 6.07173554,2.01 C5.7907438,2.01 5.55933884,2.09403361 5.36099174,2.29571429 C5.16264463,2.46378151 5.08,2.69907563 5.08,3.00159664 C5.08,3.28731092 5.16264463,3.52260504 5.36099174,3.72428571 C5.55933884,3.90915966 5.7907438,4.01 6.07173554,4.01 Z M6.05,5 C6.4918278,5 6.85,5.3581722 6.85,5.8 L6.85,9.6 C6.85,10.0418278 6.4918278,10.4 6.05,10.4 C5.6081722,10.4 5.25,10.0418278 5.25,9.6 L5.25,5.8 C5.25,5.3581722 5.6081722,5 6.05,5 Z"></path>
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
  color: ${(props) => props.theme.t_fff_40};
`;
