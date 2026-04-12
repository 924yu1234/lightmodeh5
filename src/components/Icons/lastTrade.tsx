import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function IconLastTrade({
  className,
  size,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan className={`${className} dg-icon icon-last-trade`} {...rest}>
      <svg width={size || 14} height={size || 14} viewBox="0 0 14 14">
        <g
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.6"
        >
          <g transform="translate(-214, -795)" fill="#B7BDC6">
            <g id="order-history" transform="translate(2, 598)">
              <g transform="translate(191, 0)">
                <g transform="translate(10, 0)">
                  <g id="icon_latesttrade" transform="translate(11, 197)">
                    <path
                      d="M7,0 C10.8660176,0 14,3.13399805 14,7 C14,10.8660176 10.8660176,14 7,14 C3.13401367,14 0,10.8660176 0,7 C0,3.13401367 3.13401367,0 7,0 Z M7,1.16666667 C3.77834473,1.16666667 1.16666667,3.77834473 1.16666667,7 C1.16666667,10.2216813 3.77834473,12.8333333 7,12.8333333 C10.2216813,12.8333333 12.8333333,10.2216813 12.8333333,7 C12.8333333,3.77833171 10.2216813,1.16666667 7,1.16666667 Z"
                      fillRule="nonzero"
                    ></path>
                    <path d="M7.06,2.7 C7.53496488,2.7 7.92,3.08503512 7.92,3.56 L7.91906714,6.295 L10.4441017,6.97151085 C10.9028825,7.0944408 11.1751435,7.56601059 11.0522135,8.02479144 C10.9292836,8.48357228 10.4577138,8.75583323 9.99893292,8.63290327 L6.83069621,7.7839768 C6.41253311,7.67193034 6.14932518,7.27024434 6.19908195,6.85259938 C6.20002866,6.84818824 6.2,6.84409747 6.2,6.84 L6.2,3.56 C6.2,3.08503512 6.58503512,2.7 7.06,2.7 Z"></path>
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

IconLastTrade.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

const StyledSpan = styled.div`
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  color: ${({ theme }) => theme.t_b7b};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;
