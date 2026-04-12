import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconHome(props) {
  const { size, className, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-tab-home`} {...rest}>
      <svg width={size || 24} height={size || 24} viewBox="0 0 24 24">
        <g
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g
            id="首页未点亮"
            transform="translate(1.000000, 1.000000)"
            fill="currentColor"
            fillRule="nonzero"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M12.1816316,0.37894481 L20.6724737,6.45314047 C21.5057054,7.04920619 22,8.00880817 22,9.03105994 L22,18.8262883 C22,20.5790427 20.5743421,22 18.8157895,22 L14.4736842,22 L14.4736842,17.3836921 C14.4736842,15.4716751 12.9183421,13.9214611 11,13.9214611 C9.08165789,13.9214611 7.52631579,15.4716751 7.52631579,17.3836921 L7.52631579,22 L3.18421052,22 C1.42565789,22 0,20.5790427 0,18.8262883 L0,9.03134844 C0,8.00899489 0.494211647,7.04926554 1.32752631,6.45314047 L9.81836843,0.37894481 C10.5245684,-0.126314937 11.4754316,-0.126314937 12.1816316,0.37894481 Z"
              id="路径"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}
IconHome.propTypes = {
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
  color: ${({ theme }) => theme.t_b7b};
  &:active,
  &.active {
    color: ${({ theme }) => theme.blue};
  }
`;
