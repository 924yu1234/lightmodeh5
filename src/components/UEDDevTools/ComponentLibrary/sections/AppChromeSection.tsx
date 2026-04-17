import React from 'react';
import styled from 'styled-components';

import IconWrapper from 'src/components/Icons/IconWrapper';
import IconMobileMore from 'src/components/Icons/mobileMore';
import IconMobileUser from 'src/components/Icons/mobileUser';
import IconMobileWallet from 'src/components/Icons/mobileWallet';
import SettingOutlined from 'src/components/Icons/SettingOutlined';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

const DEMO_GRID = [
  { key: 'a', label: 'Earn' },
  { key: 'b', label: 'Send' },
  { key: 'c', label: 'Receive' },
  { key: 'd', label: 'Swap' },
];

export default function AppChromeSection() {
  const intl = useIntl();
  return (
    <StyledSection>
      <h2 className="section-title">Header & entries</h2>

      <ComponentCard
        title="Home top — header icon targets"
        description="Mobile home bar: wallet / user tap area + IconWrapper 40px (more). Desktop-style: IconWrapper with title enables hover surface (bg_white_10) + blue icon — same as IconWrapper show-title."
      >
        <DemoTopBar>
          <StyledUser>
            <div className="icon-action">
              <IconMobileWallet size={26} />
            </div>
            <div className="action">{intl.connect_wallet}</div>
          </StyledUser>
          <div className="spacer" aria-hidden />
          <div className="menu-more-wrap">
            <IconWrapper
              size={40}
              title="More"
              titlePosition="bottom"
              onClick={() => {}}
            >
              <IconMobileMore />
            </IconWrapper>
          </div>
        </DemoTopBar>

        <DividerLabel>Desktop / web header icons (hover)</DividerLabel>
        <DesktopIconRow>
          <IconWrapper
            size={40}
            title="Account"
            titlePosition="bottom"
            onClick={() => {}}
          >
            <IconMobileUser size={22} />
          </IconWrapper>
          <IconWrapper
            size={40}
            title="Settings"
            titlePosition="bottom"
            onClick={() => {}}
          >
            <SettingOutlined size={20} />
          </IconWrapper>
        </DesktopIconRow>
      </ComponentCard>

      <ComponentCard
        title="Home — four-up service grid"
        description="Same grid as MobileHomeActions (no thick bottom divider in this preview). Light: hover uses theme.pressTint, theme.blue label + icon chrome (infoBarBg, ghostBtnHoverShadow). Dark: pressTint + blue accent."
      >
        <ActionsBand>
          <div className="actions-container">
            {DEMO_GRID.map((d) => (
              <ActionItem key={d.key} className="action-item">
                <span className="item-icon" aria-hidden />
                {d.label}
              </ActionItem>
            ))}
          </div>
        </ActionsBand>
      </ComponentCard>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  .section-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin: 0 0 16px;
  }
`;

const DemoTopBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px 0 12px;
  min-height: 52px;
  border-radius: 10px;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_main_80};
  max-width: 420px;

  .spacer {
    flex: 1;
    min-width: 12px;
  }

  .menu-more-wrap {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-left: 8px;

    .dg-icon {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
  }
`;

const StyledUser = styled.div`
  display: flex;
  align-items: center;

  .icon-action {
    display: flex;
    align-items: center;
  }

  .dg-icon {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }

  .action {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    padding: 0 10px;
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    line-height: 20px;
  }
`;

const DesktopIconRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-top: 8px;

  .dg-icon {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }
`;

const DividerLabel = styled.div`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }: { theme: ThemeType }) => theme.divider};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  margin-bottom: 8px;
`;

const ActionsBand = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg};
  padding: 24px 16px 20px;
  border-radius: 10px;

  .actions-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px 10px;
    width: 100%;
  }
`;

const ActionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  cursor: default;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
  white-space: nowrap;
  border-radius: 10px;
  padding: 6px 8px;
  transition: color 0.15s ease, background-color 0.15s ease,
    box-shadow 0.15s ease;

  .item-icon {
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
    border-radius: 8px;
    flex-shrink: 0;
    background: ${({ theme }: { theme: ThemeType }) => theme.buy_20};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.innerBorder2};
    transition: border-color 0.15s ease, background-color 0.15s ease,
      box-shadow 0.15s ease, transform 0.15s ease;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};

      .item-icon {
        background: ${({ theme }: { theme: ThemeType }) => theme.infoBarBg};
        border-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        box-shadow: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? 'none' : theme.ghostBtnHoverShadow};
      }
    }
  }

  &:active {
    background: ${({ theme }: { theme: ThemeType }) => theme.hover};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    .item-icon {
      transition: none;
    }
  }
`;
