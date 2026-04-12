import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconBar(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon`} {...rest}>
      <svg viewBox="0 0 20 20" width={size || 20} height={size || 20}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill="currentColor" transform="translate(2.014286, 0.000000)">
            <rect
              x="11.2857143"
              y="0"
              width="1.42857143"
              height="18"
              rx="0.5"
            ></rect>
            <rect
              transform="translate(10.000000, 5.000000) rotate(90.000000) translate(-10.000000, -5.000000) "
              x="9.28571429"
              y="3"
              width="1.42857143"
              height="4"
              rx="0.5"
            ></rect>
            <rect
              transform="translate(14.000000, 12.000000) rotate(90.000000) translate(-14.000000, -12.000000) "
              x="13.2857143"
              y="10"
              width="1.42857143"
              height="4"
              rx="0.5"
            ></rect>
            <rect
              transform="translate(6.000000, 8.000000) rotate(90.000000) translate(-6.000000, -8.000000) "
              x="5.28571429"
              y="6"
              width="1.42857143"
              height="4"
              rx="0.5"
            ></rect>
            <rect
              transform="translate(2.000000, 15.000000) rotate(90.000000) translate(-2.000000, -15.000000) "
              x="1.28571429"
              y="13"
              width="1.42857143"
              height="4"
              rx="0.5"
            ></rect>
            <rect
              x="2.98571429"
              y="2"
              width="1.42857143"
              height="18"
              rx="0.5"
            ></rect>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconBar.propTypes = {
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
