import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import DownIcon from 'js/components/Icons/downIcon';

export default function CommonSelect({
  options = [], // {key, label}
  value = '',
  // eslint-disable-next-line no-unused-vars
  onChange = (v) => {},
  width = 80,
  bordered = true,
  className = '',
  iconSize = 18,
  position = 'bottom',
}) {
  const cur = options.find((d) => d?.key === value);

  return (
    <Menu trigger="click" width={width} position={position}>
      <Menu.Target>
        <StyledCommon
          width={width}
          className={`common-select ${bordered ? 'bordered' : ''} ${className}`}
        >
          <div className="common-select-label">{cur?.label}</div>
          <DownIcon size={iconSize} />
        </StyledCommon>
      </Menu.Target>
      <Menu.Dropdown>
        {options.map((option) => {
          return (
            <Menu.Item
              key={option.key}
              className="item"
              onClick={() => {
                onChange(option.key);
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

CommonSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.number,
  bordered: PropTypes.bool,
  className: PropTypes.string,
  iconSize: PropTypes.number,
  position: PropTypes.string,
};

const StyledCommon = styled.div`
  width: ${(props) => props.width}px;
  height: 30px;
  ${(props) => props.theme.fontRegular};
  background: ${(props) => props.theme.inputBg};
  border: 1px solid ${({ theme }) => theme.border_transparent};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.t_b7b};
  font-size: 14px;
  padding: 0 12px;
  .common-select-label {
    white-space: nowrap;
  }
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
  &.placeholder {
    color: ${(props) => props.theme.t_abaeba};
  }
  &.dg-dropdown-open {
    z-index: 122;
  }
  .token-icon {
    margin-right: 5px;
  }
  .icon-down {
    margin-left: auto;
  }
`;
