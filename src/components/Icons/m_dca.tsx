import React from 'react';
import styled from 'styled-components';

export default function IconActionDCA({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-m_dca`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 30}
        height={size || 30}
        viewBox="0 0 30 30"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="tab_middle_dca"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="编组-14"></g>
          <g id="icon-calendar" transform="translate(10.2, 1.2)"></g>
          <g id="DCA">
            <rect
              id="矩形"
              stroke="#00A0FF"
              strokeWidth="2"
              x="1"
              y="3"
              width="28"
              height="26"
              rx="4"
            ></rect>
            <rect
              id="矩形"
              fill="#00A0FF"
              x="1"
              y="9"
              width="28"
              height="1.5"
            ></rect>
            <rect
              id="矩形"
              fill="#00A0FF"
              x="8"
              y="0"
              width="1.5"
              height="6"
              rx="0.75"
            ></rect>
            <rect
              id="矩形"
              fill="#00A0FF"
              x="21"
              y="0"
              width="1.5"
              height="6"
              rx="0.75"
            ></rect>
            <path
              d="M20.6696932,20.0796648 C20.780476,20.0796648 20.8865734,20.0997253 20.984551,20.1364118 C21.2517914,20.1033722 21.5318038,20.1884552 21.7383189,20.3928825 C22.0904307,20.7414347 22.0933163,21.3094352 21.744764,21.661547 L18.6689583,24.7309701 C18.3154747,25.0837174 17.7435029,25.0848754 17.3885938,24.7335623 C17.0364849,24.3850208 17.0335928,23.8170314 17.3821343,23.4649225 L18.975,21.875 L10.9626871,21.8756565 C10.4667362,21.8756556 10.0646874,21.4736108 10.0646816,20.9776598 C10.0646759,20.4817166 10.4667127,20.0796705 10.962656,20.0796648 L20.6696932,20.0796648 Z M10.9815705,13.1956481 C10.9986921,13.2100605 11.0152257,13.2251573 11.031131,13.2409017 C11.3934685,13.5995763 11.4196682,14.1763668 11.0913402,14.5664136 L9.785,16.117 L17.6548671,16.1175542 C18.1508218,16.1175542 18.5528725,16.5196049 18.5528725,17.0155595 C18.5528725,17.473363 18.2102973,17.8511538 17.7675124,17.9065665 L17.6548671,17.9135632 L8.01056439,17.9150839 C7.77911589,17.9529181 7.53315901,17.8932767 7.33967124,17.7304054 C7.32255269,17.7159956 7.30602198,17.7009015 7.29011937,17.6851601 C6.92778269,17.3264945 6.90157903,16.7497113 7.22990138,16.3596686 L9.80840156,13.2964442 C10.1045291,12.9446485 10.6297748,12.8995205 10.9815705,13.1956481 Z"
              id="路径-2"
              fill="#00A0FF"
              fillRule="nonzero"
              transform="translate(14.5022, 18.9981) scale(-1, 1) translate(-14.5022, -18.9981)"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.div`
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
`;
