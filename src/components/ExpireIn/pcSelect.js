/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import { useIntl } from 'js/locals';

import IconDown from '../Icons/downIcon';

export default function PeriodSelect({
  options = [],
  value = '',
  onChange = (v) => {},
}) {
  const intl = useIntl();

  const cur = options.find((d) => d?.value === value);

  return (
    <Menu trigger="click" position="bottom-end" width={85}>
      <Menu.Target>
        <StyledPeriod className="period-select">
          {cur?.label}
          <IconDown className="period-down-icon" />
        </StyledPeriod>
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
  );
}

PeriodSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const StyledPeriod = styled.div`
  white-space: nowrap;
  position: relative;
  height: 30px;
  display: flex;
  padding-left: 5px;
  padding-right: 5px;

  ${(props) => props.theme.fontMedium};
  font-size: 14px;
  color: ${(props) => props.theme.t_b7b};
  letter-spacing: 0;
  line-height: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: flex-end;
  user-select: none;

  border-left: none;
  &:hover {
    color: ${(props) => props.theme.blue1};
  }
  &[data-expanded] {
    .period-down-icon {
      transform: rotate(180deg);
    }
  }
  .period-down-icon {
    width: 16px;
    margin-left: 2px;
  }
`;
