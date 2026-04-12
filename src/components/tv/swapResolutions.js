import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import { Menu } from 'src/UI';

import { useThemeParams } from 'src/theme';

import IconArrows from 'js/components/Icons/arrowDown';
import useWindowSize from 'js/hooks/useWindowSize';
import { useIntl } from 'js/locals';

export default function TvResolutions({ value, onChange }) {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const { width } = useWindowSize();
  const isMiniView = width < 1200 || isMobile;

  let autoHides = [];
  if (isMiniView) {
    autoHides = ['5S', '15S', '3', '5', '15', '30'];
  }

  const resolutions = getResolutionOptions({
    intl,
    hides: ['3', '15', '30'],
    autoHides,
  });

  const list = resolutions.filter((d) => !d.hide);
  const cur = resolutions.find(
    (r) => r.key === value || r.minutesKey === value
  );
  const isInDropdown = cur?.hide;

  return (
    <StyledTvResolutions className="tv-resolutions">
      <div className="list">
        {list.map(({ key, label }) => (
          <div
            key={key}
            className={`list-item ${key === value ? 'item-active' : ''}`}
            onClick={() => {
              onChange(key);
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <Menu trigger="hover">
        <Menu.Target>
          <div className="tv-resolutions-select-tpl">
            {isInDropdown ? (
              <div className="tv-resolutions-select-label">{cur?.label}</div>
            ) : (
              <div className="tv-resolutions-select-label-more">
                {intl?.more}
              </div>
            )}
            <IconArrows />
          </div>
        </Menu.Target>
        <Menu.Dropdown
          className="tv-resolutions-select-dropdown"
          style={{ padding: '0' }}
        >
          <div className="menu-items">
            {resolutions.map(({ key, label }) => (
              <Menu.Item
                key={key}
                className="item"
                onClick={() => {
                  onChange(key);
                }}
              >
                {label}
              </Menu.Item>
            ))}
          </div>
        </Menu.Dropdown>
      </Menu>
      <DropdownCommonSelect />
    </StyledTvResolutions>
  );
}

TvResolutions.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const StyledTvResolutions = styled.div`
  display: flex;
  align-items: center;

  .tv-resolutions-select-tpl {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    .tv-resolutions-select-label {
      margin-right: 10px;
      ${(props) => props.theme.fontRegular};
      font-size: 12px;
      color: ${(props) => props.theme.blue};
    }
    .tv-resolutions-select-label-more {
      margin-right: 5px;
      ${(props) => props.theme.fontRegular};
      font-size: 12px;
      color: ${(props) => props.theme.t_b7b};
    }
    .icon-arrows {
      cursor: pointer;
    }
    &:hover {
      .tv-resolutions-select-label-more {
        color: ${(props) => props.theme.blue};
      }
      .icon-arrows {
        color: ${(props) => props.theme.blue};
      }
    }
  }

  .list {
    display: flex;
    align-items: center;
    ${(props) => props.theme.fontRegular};
    font-size: 12px;
    color: ${(props) => props.theme.t_b7b};
    margin-left: 10px;

    .list-item {
      cursor: pointer;
      height: 20px;
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 6px;
      min-width: 36px;
      &:hover {
        background: ${({ theme }) => theme.bg_white_10};
        border-radius: 10px;
      }
    }
    .list-item:hover {
      color: ${(props) => props.theme.blue};
    }
    .item-active {
      border-radius: 2px;
      color: ${(props) => props.theme.blue};
    }
    .common-select-label {
      border: none;
      font-size: 14px;
      min-width: 50px;
      color: ${(props) => props.theme.t_b7b};
      width: auto;
      &.active {
        color: ${(props) => props.theme.t_d4d};
      }
    }
  }
`;

const DropdownCommonSelect = createGlobalStyle`
  .tv-resolutions-select-dropdown .menu-items {
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.modalBg};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 15px 10px 5px;
    max-width: 260px;
    flex-wrap: wrap;
    border-right: none;
    .mantine-Menu-item.item {
      width: auto;
      margin: 0 5px 10px;
      background: ${({ theme }) => theme.bg_white_10};
      border-radius: 6px;
      height: 26px;
      padding: 0 5px;
      line-height: 24px;
      min-width: 50px;
      ${(props) => props.theme.fontRegular};
      font-size: 12px;
      color: ${(props) => props.theme.blue};
      letter-spacing: 0;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: ${({ theme }) => theme.bg_blue_15};
        border-radius: 6px;
      }
    }
  }
`;

export const getResolutionOptions = ({
  hides = ['1', '3', '5', '15', '30'],
  autoHides = [],
  intl,
}) => {
  const hideItems = hides.concat(autoHides);
  const list = [
    { key: '1S', label: intl['kline.time_1s'] },
    {
      key: '5S',
      label: intl['kline.time_5s'],
      hide: hideItems.includes('15S'),
    },
    {
      key: '15S',
      label: intl['kline.time_15s'],
      hide: hideItems.includes('15S'),
    },
    {
      key: '30S',
      label: intl['kline.time_30s'],
      hide: hideItems.includes('30S'),
    },
    { key: '1', label: intl['kline.time_1m'] },
    { key: '3', label: intl['kline.time_3m'], hide: hideItems.includes('3') },
    { key: '5', label: intl['kline.time_5m'], hide: hideItems.includes('5') },
    {
      key: '15',
      label: intl['kline.time_15m'],
      hide: hideItems.includes('15'),
    },
    {
      key: '30',
      label: intl['kline.time_30m'],
      hide: hideItems.includes('30'),
    },
  ];
  return list;
};
