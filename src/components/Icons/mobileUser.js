import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconMobileUser(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-mobileUser`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 26 26"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>icon account</title>
        <g
          id="icon-account"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="编组-9" fill="#B7BDC6">
            <g id="编组-5">
              <path
                d="M13,0 C20.1797017,-1.31888981e-15 26,5.82029825 26,13 C26,20.1797017 20.1797017,26 13,26 C5.82029825,26 8.79259876e-16,20.1797017 0,13 C-8.79259876e-16,5.82029825 5.82029825,1.31888981e-15 13,0 Z"
                id="Rectangle-5-Copy"
                opacity="0.1"
              ></path>
              <g id="iconaccount_on" transform="translate(3, 3)">
                <circle
                  id="椭圆形"
                  stroke="#B7BDC6"
                  strokeWidth="1.4"
                  opacity="0.2"
                  cx="10"
                  cy="10"
                  r="9.3"
                ></circle>
                <g
                  id="个人3"
                  transform="translate(4.3501, 3.6027)"
                  fillRule="nonzero"
                  opacity="0.5"
                >
                  <path
                    d="M5.5,7 C3.57022828,7 2,5.42977172 2,3.5 C2,1.57022828 3.57022828,0 5.5,0 C7.42977172,0 9,1.57022828 9,3.5 C9,5.42977172 7.42977172,7 5.5,7 Z M9.39537005,12.8136364 L1.73718823,12.8136364 C1.18218823,12.8136364 0.657188231,12.5586364 0.33127914,12.1318182 C0.0244609579,11.7295455 -0.0750844966,11.2236364 0.0571882307,10.7422727 C0.500370049,9.12772727 2.05218823,8 3.83037005,8 L7.30082459,8 C9.07900641,8 10.6308246,9.12772727 11.0740064,10.7409091 C11.2062791,11.2222727 11.1067337,11.7295455 10.7999155,12.1304545 C10.4740064,12.5586364 9.94900641,12.8136364 9.39537005,12.8136364 Z"
                    id="路径-3"
                  ></path>
                </g>
              </g>
            </g>
            <g id="主按钮" opacity="0.1">
              <path
                d="M13,0 C20.1797017,-1.31888981e-15 26,5.82029825 26,13 C26,20.1797017 20.1797017,26 13,26 C5.82029825,26 8.79259876e-16,20.1797017 0,13 C-8.79259876e-16,5.82029825 5.82029825,1.31888981e-15 13,0 Z"
                id="Rectangle-5-Copy"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconMobileUser.propTypes = {
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
