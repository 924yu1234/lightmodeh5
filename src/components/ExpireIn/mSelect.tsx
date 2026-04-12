import React, { useState } from 'react';
import iconArrow from 'imgs/arrow_down.svg';
import iconArrowActive from 'imgs/arrow_down-active.svg';
import styled from 'styled-components';

import { Drawer } from 'src/UI';

export default function PeriodSelect({
  options = [],
  value = '',
  onChange,
}: {
  options: any[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  const cur = options.find((d) => d?.value === value);

  return (
    <>
      <StyledPeriod
        className="period-select"
        iconHover={iconArrowActive}
        icon={iconArrow}
        onClick={() => {
          setVisible(true);
        }}
      >
        {cur?.label}
      </StyledPeriod>
      <Drawer
        opened={visible}
        withCloseButton={false}
        onClose={() => {
          setVisible(false);
        }}
        position="bottom"
        size="auto"
      >
        <StyledPopup>
          {options.map((option) => {
            return (
              <div
                key={option.value}
                className={`item ${option.value === cur.value ? 'active' : ''}`}
                onClick={() => {
                  setVisible(false);
                  onChange(option.value);
                }}
              >
                {option.label}
              </div>
            );
          })}
        </StyledPopup>
      </Drawer>
    </>
  );
}

const StyledPeriod = styled.div<{ icon: any; iconHover: any }>`
  white-space: nowrap;
  position: relative;
  height: 30px;
  display: flex;
  margin-left: 10px;
  padding-right: 20px;

  ${(props) => props.theme.fontMedium};
  font-size: 14px;
  color: ${(props) => props.theme.t_b7b};
  letter-spacing: 0;
  line-height: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: flex-end;

  background: url(${(props) => props.icon}) no-repeat center right;
  border-left: none;
  background-position: bottom 11px right 5px;
  background-size: 10px;
  &:hover {
    color: ${(props) => props.theme.blue1};
    background: url(${(props) => props.iconHover}) no-repeat center right;
    background-position: bottom 11px right 5px;
    background-size: 10px;
  }
`;

const StyledPopup = styled.div`
  padding-bottom: 20px;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) => props.theme.fontRegular};
    font-size: 15px;
    color: ${(props) => props.theme.t_b7b};
    letter-spacing: 0;
    text-align: center;
    height: 50px;
    border-top: 1px solid ${(props) => props.theme.innerBorder};
    &.active {
      color: ${(props) => props.theme.blue};
    }
  }
`;
