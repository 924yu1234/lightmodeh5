import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconMobileWallet(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-mobileWallet`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 26 26"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>icon disconnect wallet</title>
        <g
          id="icon-disconnect-wallet"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="主按钮">
            <path
              d="M13,0 C20.1797017,-1.31888981e-15 26,5.82029825 26,13 C26,20.1797017 20.1797017,26 13,26 C5.82029825,26 8.79259876e-16,20.1797017 0,13 C-8.79259876e-16,5.82029825 5.82029825,1.31888981e-15 13,0 Z"
              id="Rectangle-5-Copy"
              fill="#B7BDC6"
              opacity="0.1"
            ></path>
            <g
              id="账户管理-已连接"
              fill="#00A0FF"
              stroke="#00A0FF"
              strokeWidth="1.5"
            >
              <g id="我的资产-icon-点亮" transform="translate(5, 7)">
                <path
                  d="M14,0.75 C14.345178,0.75 14.657678,0.889911016 14.8838835,1.11611652 C15.110089,1.34232203 15.25,1.65482203 15.25,2 L15.25,3.068 L9.72727273,3.0688028 C9.30442972,3.0688028 8.9166134,3.21876992 8.61411022,3.46841773 L8.48983586,3.58136594 C8.17314815,3.89805365 7.97727273,4.33555365 7.97727273,4.8188028 L7.97727273,8.27334826 C7.97727273,8.75659741 8.17314815,9.19409741 8.48983586,9.51078512 C8.80652357,9.82747284 9.24402357,10.0233483 9.72727273,10.0233483 L15.25,10.023 L15.25,10.8 C15.25,11.145178 15.110089,11.457678 14.8838835,11.6838835 C14.657678,11.910089 14.345178,12.05 14,12.05 L2,12.05 C1.65482203,12.05 1.34232203,11.910089 1.11611652,11.6838835 C0.889911016,11.457678 0.75,11.145178 0.75,10.8 L0.75,2 C0.75,1.65482203 0.889911016,1.34232203 1.11611652,1.11611652 C1.34232203,0.889911016 1.65482203,0.75 2,0.75 L14,0.75 Z M10.9826471,6.06695526 C10.9205682,6.21938218 10.8863636,6.38612834 10.8863636,6.56086341 C10.8863636,6.92267686 11.0330175,7.25023747 11.2701248,7.48734471 L11.221,7.432 L10.9450327,7.43243917 L10.7030231,6.0903859 Z M15.2308485,5.72302663 L15.2308485,7.43243917 L13.1738351,7.43367051 C13.3809418,7.20194641 13.5068485,6.89610845 13.5068485,6.56086341 C13.5068485,6.31062961 13.4367004,6.07677979 13.314996,5.87790585 L15.2308485,5.72302663 Z"
                  id="矩形-3"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconMobileWallet.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

const StyledSpan = styled.div`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  &.active {
    color: ${({ theme }) => theme.blue};
  }
`;
