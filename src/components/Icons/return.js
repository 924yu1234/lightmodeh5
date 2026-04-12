import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconReturn(props) {
  const { className, size, ...rest } = props;
  return (
    <StyledSpan className={`${className} dg-icon icon-return`} {...rest}>
      <svg viewBox="0 0 20 20" width={size || 20} height={size || 20}>
        <g
          id="icon_return"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g
            id="返回"
            transform="translate(3.000000, 3.000000)"
            fill="currentColor"
          >
            <path
              d="M7.92903467,1.94935421 L3.92137896,1.94935421 L3.92137896,0.9429942 C3.92137896,0.666851825 3.69752133,0.4429942 3.42137896,0.4429942 C3.32135056,0.4429942 3.22362149,0.472996687 3.14082387,0.529123636 L0.61053552,2.2443586 C0.381961118,2.39930489 0.322273745,2.71020985 0.47722004,2.93878425 C0.512802364,2.99127475 0.55804502,3.0365174 0.61053552,3.07209973 L3.14082387,4.78733469 C3.36939827,4.94228098 3.68030323,4.88259361 3.83524952,4.65401921 C3.89137647,4.57122159 3.92137896,4.47349252 3.92137896,4.37346412 L3.92137896,3.36708335 L3.92137896,3.36708335 L7.92903467,3.36708335 C10.6813292,3.36708335 12.6996642,5.1392292 12.6996642,7.97468749 C12.6996642,10.8101458 10.6813292,12.5822709 7.92903467,12.5822709 L3.59111221,12.5822709 C3.22413243,12.5822709 2.85715266,12.9367083 2.85715266,13.2911458 C2.85715266,13.6455833 3.22413243,14 3.59111221,14 L7.92903467,14 C11.4152673,14 14.1675618,11.6075938 14.1675618,7.97468749 C14.1675618,4.34178122 11.4152673,1.94935421 7.92903467,1.94935421 Z"
              id="路径"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

IconReturn.propTypes = {
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
`;
