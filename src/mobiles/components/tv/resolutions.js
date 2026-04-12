import React, { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getResolutionOptions } from 'src/components/tv/settings';
import { useThemeParams } from 'src/theme';

import IconArrows from 'js/components/Icons/arrowDown';
import useWindowSize from 'js/hooks/useWindowSize';
import { useIntl } from 'js/locals';

export default function TvResolutions({ value, onChange }) {
  const intl = useIntl();
  const { width } = useWindowSize();
  const { isMobile } = useThemeParams();
  const marginAuto = width < 1280 || isMobile;
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useClickOutside(() => {
    setShowDropdown(false);
  });

  const resolutions = getResolutionOptions({
    intl,
    hides: ['1', '3', '5', '30', '120', '360', '44640'],
    autoHides: marginAuto ? ['60', '10080'] : [],
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
      <StyledWrapper
        onClick={() => {
          setShowDropdown((pre) => !pre);
        }}
        ref={ref}
      >
        <StyledTarget>
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
        </StyledTarget>
        {showDropdown && (
          <StyledDropdown>
            <div className="list">
              {resolutions.map(({ key, label }) => (
                <div
                  key={key}
                  className="item"
                  onClick={() => {
                    onChange(key);
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </StyledDropdown>
        )}
      </StyledWrapper>
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
  position: relative;

  .tv-resolutions-select-tpl {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    .tv-resolutions-select-label {
      white-space: nowrap;
      margin-right: 5px;
      ${(props) => props.theme.fontRegular};
      font-size: 12px;
      color: ${(props) => props.theme.blue};
    }
    .tv-resolutions-select-label-more {
      margin-right: 5px;
      ${(props) => props.theme.fontRegular};
      font-size: 12px;
      color: ${(props) => props.theme.t_b7b};
      white-space: nowrap;
    }
    .icon-arrows {
      cursor: pointer;
    }
    @media (hover: hover) {
      &:hover {
        .tv-resolutions-select-label-more {
          color: ${(props) => props.theme.blue};
        }
        .icon-arrows {
          color: ${(props) => props.theme.blue};
        }
      }
    }
  }

  .list {
    display: flex;
    align-items: center;
    ${(props) => props.theme.fontRegular};
    font-size: 12px;
    color: ${(props) => props.theme.t_b7b};

    .list-item {
      cursor: pointer;
      height: 20px;
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      white-space: nowrap;
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

const StyledWrapper = styled.div``;

const StyledTarget = styled.div``;

const StyledDropdown = styled.div`
  position: absolute;
  background: ${(props) => props.theme.modalBg};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 5px;
  top: 30px;
  left: 10px;
  z-index: 111;

  .list {
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.modalBg};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 15px 10px 5px;
    width: 260px;
    flex-wrap: wrap;
    border-right: none;
    .item {
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
