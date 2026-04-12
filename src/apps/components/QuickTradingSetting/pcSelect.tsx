/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import DeTooltip from 'src/components/DeTooltip';
import IconDown from 'src/components/Icons/downIcon';
import { useIntl } from 'src/locals';

export default function ModeSelectPC({
  options = [],
  value = '',
  onChange = (v) => {},
}: {
  options: any[];
  value: string;
  onChange: (v: string) => void;
}) {
  const intl = useIntl();
  const cur = options.find((d) => d?.value === value);

  return (
    <StyledQuickTradingSetting className="quick-trading-setting">
      <div className="label">
        <DeTooltip
          position="left"
          title={
            <div
              dangerouslySetInnerHTML={{ __html: intl.authorization_mode_tips }}
            />
          }
          childrenTitle={intl.authorization_mode}
          infoSize={20}
        />
      </div>

      <Menu
        trigger="click"
        position="bottom-end"
        width={intl.language?.includes('zh') ? 100 : 130}
      >
        <Menu.Target>
          <StyledSelect>
            {cur?.label}
            <IconDown className="setting-down-icon" />
          </StyledSelect>
        </Menu.Target>
        <Menu.Dropdown>
          {options.map((option) => {
            return (
              <Menu.Item
                key={option.value}
                className="item"
                onClick={() => {
                  onChange(option.value);
                }}
              >
                {option.label}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    </StyledQuickTradingSetting>
  );
}

const StyledQuickTradingSetting = styled.div`
  display: flex;
  align-items: center;
  .label {
    ${(props) => props.theme.fontRegular};
    height: 20px;
    display: inline-block;
    font-size: 14px;
    line-height: 18px;
    color: ${(props) => props.theme.t_b7b_80};
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin-right: auto;
    white-space: normal;
  }
`;

const StyledSelect = styled.div`
  white-space: nowrap;
  position: relative;
  height: 30px;
  display: flex;
  padding-left: 5px;
  user-select: none;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }

  ${(props) => props.theme.fontMedium};
  font-size: 14px;
  color: ${(props) => props.theme.t_b7b};
  letter-spacing: 0;
  line-height: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: flex-end;

  border-left: none;
  &[data-expanded] {
    .setting-down-icon {
      transform: rotate(180deg);
    }
  }
  .setting-down-icon {
    width: 16px;
    margin-left: 2px;
  }
`;
