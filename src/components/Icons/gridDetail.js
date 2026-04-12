import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function GridDetail(props) {
  const { size, className = '', ...rest } = props;
  return (
    <StyledSpan className={`dg-icon icon-gridDetail ${className}`} {...rest}>
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 13 13"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-665.000000, -673.000000)">
            <g transform="translate(2.000000, 590.000000)">
              <g transform="translate(16.000000, 82.000000)">
                <g transform="translate(647.000000, 1.000000)">
                  <g transform="translate(1.000000, 0.000000)">
                    <path
                      d="M2.5638852,0.5 L7.4361148,0.5 C8.18603493,0.5 8.46500132,0.560408843 8.74104627,0.708039303 C8.97854914,0.835057224 9.16494278,1.02145086 9.2919607,1.25895373 C9.43959116,1.53499868 9.5,1.81396507 9.5,2.5638852 L9.5,2.5638852 L9.5,9.4361148 C9.5,10.1860349 9.43959116,10.4650013 9.2919607,10.7410463 C9.16494278,10.9785491 8.97854914,11.1649428 8.74104627,11.2919607 C8.46500132,11.4395912 8.18603493,11.5 7.4361148,11.5 L7.4361148,11.5 L2.5638852,11.5 C1.81396507,11.5 1.53499868,11.4395912 1.25895373,11.2919607 C1.02145086,11.1649428 0.835057224,10.9785491 0.708039303,10.7410463 C0.560408843,10.4650013 0.5,10.1860349 0.5,9.4361148 L0.5,9.4361148 L0.5,2.5638852 C0.5,1.81396507 0.560408843,1.53499868 0.708039303,1.25895373 C0.835057224,1.02145086 1.02145086,0.835057224 1.25895373,0.708039303 C1.53499868,0.560408843 1.81396507,0.5 2.5638852,0.5 L2.5638852,0.5 Z"
                      stroke="currentColor"
                    />
                    <path
                      d="M3.5,3 L6.5,3 C6.77614237,3 7,3.22385763 7,3.5 C7,3.77614237 6.77614237,4 6.5,4 L3.5,4 C3.22385763,4 3,3.77614237 3,3.5 C3,3.22385763 3.22385763,3 3.5,3 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M3.5,5 L6.5,5 C6.77614237,5 7,5.22385763 7,5.5 C7,5.77614237 6.77614237,6 6.5,6 L3.5,6 C3.22385763,6 3,5.77614237 3,5.5 C3,5.22385763 3.22385763,5 3.5,5 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M3.5,7 L4.5,7 C4.77614237,7 5,7.22385763 5,7.5 C5,7.77614237 4.77614237,8 4.5,8 L3.5,8 C3.22385763,8 3,7.77614237 3,7.5 C3,7.22385763 3.22385763,7 3.5,7 Z"
                      fill="currentColor"
                    />
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
GridDetail.propTypes = {
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
  cursor: pointer;
`;
