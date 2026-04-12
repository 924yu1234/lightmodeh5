import React from 'react';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import IconChosen from 'src/components/Icons/chosen';
import IconWrapper from 'src/components/Icons/IconWrapper';
import IconLanguage from 'src/components/Icons/language';
import {
  useLogLanguageCompleted,
  useLogLanguageStart,
} from 'src/hooks/useEventTrack/utils/useLogLanguage';
import { LANGUAGES } from 'src/locals/intlUtils';
import { useToggleWalletTradeBtn } from 'src/state/application/hooks';

import { useSetLocale } from 'js/locals';

const Dropdown = Menu.Dropdown;

export default function LanguageChoose() {
  const { locale, setLocale } = useSetLocale();
  const toogleWalletTrade = useToggleWalletTradeBtn();
  const logLanguageStart = useLogLanguageStart();
  const logLanguageCompleted = useLogLanguageCompleted();

  return (
    <Menu
      width={135}
      trigger="click"
      offset={9}
      position="bottom"
      onChange={(opened) => {
        if (opened) {
          toogleWalletTrade(true);
          logLanguageStart();
        } else {
          setTimeout(() => {
            toogleWalletTrade(false);
          }, 300);
        }
      }}
    >
      <Menu.Target>
        <IconWrapper className="language-wrapper" size={40}>
          <IconLanguage />
        </IconWrapper>
      </Menu.Target>
      <StyledDropdown>
        {LANGUAGES.filter((d) => !d.hide).map((option) => {
          const isCur = option.key === locale;
          return (
            <Menu.Item
              key={option.key}
              className="item"
              onClick={() => {
                toogleWalletTrade(true);
                setLocale(option.key);
                logLanguageCompleted(locale, option.key);
                setTimeout(() => {
                  toogleWalletTrade(false);
                }, 300);
              }}
            >
              <div style={{ width: 20 }}>{isCur && <IconChosen />}</div>
              {option.label}
            </Menu.Item>
          );
        })}
      </StyledDropdown>
    </Menu>
  );
}

const StyledDropdown = styled(Dropdown)`
  &.mantine-Menu-dropdown .mantine-Menu-item {
    height: 50px;
    text-align: center;
    .mantine-Menu-itemLabel {
      display: flex;
      align-items: center;
    }
  }
`;
