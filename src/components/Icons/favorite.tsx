import React from 'react';
import styled from 'styled-components';

export default function IconFavorite({
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
      className={`${className} dg-icon icon-favorite`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || '18px'}
        height={size || '17px'}
        viewBox="0 0 18 17"
        version="1.1"
      >
        <g
          id="A1-创建交易账户"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="连接钱包"
            transform="translate(-110.000000, -140.000000)"
            fill="currentColor"
          >
            <g id="币种" transform="translate(15.000000, 95.000000)">
              <g id="01">
                <g id="编组-10" transform="translate(94.000000, 13.000000)">
                  <path
                    d="M10,46 L5.5569252,48.3358627 C5.16584953,48.5414633 4.68214781,48.3911061 4.47654716,48.0000304 C4.3946759,47.844302 4.36642416,47.6659276 4.39616564,47.4925215 L5.24471742,42.545085 L5.24471742,42.545085 L1.6501944,39.041291 C1.33380754,38.73289 1.32733369,38.2263994 1.63573466,37.9100125 C1.75854154,37.7840256 1.91945547,37.7020359 2.0935651,37.6767363 L7.06107374,36.954915 L7.06107374,36.954915 L9.28261114,32.4535886 C9.47814897,32.0573857 9.95784964,31.8947145 10.3540526,32.0902523 C10.5118227,32.1681165 10.6395247,32.2958185 10.7173889,32.4535886 L12.9389263,36.954915 L12.9389263,36.954915 L17.9064349,37.6767363 C18.3436708,37.7402704 18.646616,38.1462247 18.5830819,38.5834606 C18.5577823,38.7575702 18.4757925,38.9184841 18.3498056,39.041291 L14.7552826,42.545085 L14.7552826,42.545085 L15.6038344,47.4925215 C15.6785232,47.9279906 15.3860529,48.3415554 14.9505837,48.4162442 C14.7771776,48.4459857 14.5988032,48.4177339 14.4430748,48.3358627 L10,46 L10,46 Z"
                    id="收藏-点亮"
                  ></path>
                </g>
              </g>
            </g>
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

  color: ${(props) => props.theme.t_a1a} !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.active {
    color: ${(props) => props.theme.t_ffc331} !important;
  }
`;
