import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconCloseX(props) {
  const { className, size, onClick, ...rest } = props;
  return (
    <StyledSpan
      className={`${className} dg-icon icon-close-x`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width="17.0572848px"
        height="17.0572848px"
        viewBox="0 0 17.0572848 17.0572848"
        version="1.1"
      >
        <title>icon_close</title>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1380.5651, -43.3151)" fill="#B7BDC6">
            <g id="iframe" transform="translate(20, 20)">
              <g id="4-icons" transform="translate(1239, 18)">
                <g id="icon_close" transform="translate(120, 4)">
                  <g id="button-close" transform="translate(1.5651, 1.3151)">
                    <path d="M0.504653464,0.292893219 C0.895177756,-0.0976310729 1.52834273,-0.0976310729 1.91886703,0.292893219 L8.528,6.902 L15.1384177,0.292893219 C15.528942,-0.0976310729 16.162107,-0.0976310729 16.5526313,0.292893219 L16.7643915,0.504653464 C17.1549158,0.895177756 17.1549158,1.52834273 16.7643915,1.91886703 L10.154,8.528 L16.7643915,15.1384177 C17.1248755,15.4989017 17.152605,16.0661327 16.8475801,16.458424 L16.7643915,16.5526313 L16.5526313,16.7643915 C16.162107,17.1549158 15.528942,17.1549158 15.1384177,16.7643915 L8.528,10.154 L1.91886703,16.7643915 C1.52834273,17.1549158 0.895177756,17.1549158 0.504653464,16.7643915 L0.292893219,16.5526313 C-0.0976310729,16.162107 -0.0976310729,15.528942 0.292893219,15.1384177 L6.902,8.528 L0.292893219,1.91886703 C-0.0675907428,1.55838306 -0.0953202783,0.991152009 0.209704612,0.598860802 L0.292893219,0.504653464 Z"></path>
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

IconCloseX.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const StyledSpan = styled.div`
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;

  color: ${({ theme }) => theme.t_b7b};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.t_b7b};
  }
`;
