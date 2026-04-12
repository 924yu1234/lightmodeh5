import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconWrapper from 'js/components/Icons/IconWrapper';
import { useIntl } from 'js/locals';

export default function TvExitFullScreen(props) {
  const { className, size, ...rest } = props;
  const intl = useIntl();
  return (
    <IconWrapper size={30} title={intl.icon_exit_full_screen} {...rest}>
      <StyledSpan className={`${className} dg-icon icon-tv-exit-full-screen`}>
        <svg viewBox="0 0 20 20" width={size || 20} height={size || 20}>
          <g
            id="icon-exit-fullscreen-on"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g
              id="全屏-icon-未点"
              transform="translate(3.016644, 2.983356)"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <g id="编组-2">
                <path
                  d="M4.82250603,14.0166439 L0.789881091,14.0166439 C0.344449641,14.0166439 -0.0166438958,13.6492277 -0.0166438958,13.1959968 L-0.0166438958,9.09276141 M0.811388424,13.1726682 L5.62903101,8.55371589"
                  id="形状结合"
                  transform="translate(3.032809, 10.983835) scale(-1, 1) rotate(90.000000) translate(-3.032809, -10.983835) "
                ></path>
                <path
                  d="M12.7236006,6.08226149 L8.6909757,6.08226149 C8.24554425,6.08226149 7.88445072,5.71484528 7.88445072,5.26161441 L7.88445072,1.15837901 M8.71248304,5.23828577 L13.5301256,0.619333487"
                  id="形状结合"
                  transform="translate(10.933903, 3.049453) scale(1, -1) rotate(90.000000) translate(-10.933903, -3.049453) "
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </StyledSpan>
    </IconWrapper>
  );
}

TvExitFullScreen.propTypes = {
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
