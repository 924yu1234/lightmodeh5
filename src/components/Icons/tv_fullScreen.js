import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconWrapper from 'js/components/Icons/IconWrapper';
import { useIntl } from 'js/locals';

export default function TvFullScreen(props) {
  const { className, size, ...rest } = props;
  const intl = useIntl();
  return (
    <IconWrapper size={30} title={intl.icon_full_screen} {...rest}>
      <StyledSpan className={`${className} dg-icon icon-tv-full-screen`}>
        <svg viewBox="0 0 20 20" width={size || 20} height={size || 20}>
          <g
            id="icon-fullscreen-on"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g
              id="全屏-icon-未点"
              transform="translate(3.000000, 3.000000)"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <g id="编组-2">
                <path
                  d="M4.83914992,14 L0.806524987,14 C0.361093536,14 0,13.6325838 0,13.1793529 L0,9.07611752 M0.82803232,13.1560243 L5.64567491,8.53707199"
                  id="形状结合"
                ></path>
                <path
                  d="M12.7402445,6.0656176 L8.7076196,6.0656176 C8.26218815,6.0656176 7.90109461,5.69820138 7.90109461,5.24497052 L7.90109461,1.14173511 M8.72912693,5.22164188 L13.5467695,0.602689591"
                  id="形状结合"
                  transform="translate(10.950547, 3.032809) scale(-1, -1) translate(-10.950547, -3.032809) "
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </StyledSpan>
    </IconWrapper>
  );
}

TvFullScreen.propTypes = {
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
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;
