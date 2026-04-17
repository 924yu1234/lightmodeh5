/**
 * UI Components Library Showcase Page
 *
 * Accessible at /ued-components — displays all src/UI components
 * with their variants and states for UED designers to reference.
 */
import React, { useState } from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

import AppChromeSection from './sections/AppChromeSection';
import ButtonsSection from './sections/ButtonsSection';
import CardsSection from './sections/CardsSection';
import DataDisplaySection from './sections/DataDisplaySection';
import InputsSection from './sections/InputsSection';
import LinksSection from './sections/LinksSection';
import MenuSection from './sections/MenuSection';
import MobileListRowsSection from './sections/MobileListRowsSection';
import OverlaysSection from './sections/OverlaysSection';
import SelectionSection from './sections/SelectionSection';
import SelectSection from './sections/SelectSection';
import TablesSection from './sections/TablesSection';
import TabsSection from './sections/TabsSection';

interface SectionDef {
  id: string;
  label: string;
  component: React.ComponentType;
  /** Sidebar group label; consecutive items with the same group render one heading. */
  navGroup?: string;
}

const SECTIONS: SectionDef[] = [
  {
    id: 'buttons',
    label: 'Buttons',
    component: ButtonsSection,
    navGroup: 'Core',
  },
  { id: 'inputs', label: 'Inputs', component: InputsSection, navGroup: 'Core' },
  {
    id: 'links',
    label: 'Text links',
    component: LinksSection,
    navGroup: 'Core',
  },
  {
    id: 'app-chrome',
    label: 'Header & entries',
    component: AppChromeSection,
    navGroup: 'Product chrome',
  },
  {
    id: 'list-rows',
    label: 'Mobile list rows',
    component: MobileListRowsSection,
    navGroup: 'Product chrome',
  },
  {
    id: 'cards',
    label: 'Cards',
    component: CardsSection,
    navGroup: 'Surfaces',
  },
  {
    id: 'selection',
    label: 'Selection',
    component: SelectionSection,
    navGroup: 'System',
  },
  { id: 'tabs', label: 'Tabs', component: TabsSection, navGroup: 'System' },
  {
    id: 'overlays',
    label: 'Overlays',
    component: OverlaysSection,
    navGroup: 'System',
  },
  {
    id: 'data',
    label: 'Data Display',
    component: DataDisplaySection,
    navGroup: 'System',
  },
  { id: 'menu', label: 'Menu', component: MenuSection, navGroup: 'System' },
  {
    id: 'select',
    label: 'Select',
    component: SelectSection,
    navGroup: 'System',
  },
  {
    id: 'tables',
    label: 'Tables',
    component: TablesSection,
    navGroup: 'System',
  },
];

export default function ComponentLibrary() {
  const [active, setActive] = useState('buttons');

  const handleNavClick = (id: string) => {
    setActive(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <StyledLibrary>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>UI Components</h1>
          <p>src/UI library reference</p>
        </div>
        <nav className="sidebar-nav">
          {SECTIONS.map((s, i) => {
            const prev = i > 0 ? SECTIONS[i - 1] : null;
            const showGroup =
              s.navGroup && (!prev || prev.navGroup !== s.navGroup);
            return (
              <React.Fragment key={s.id}>
                {showGroup && (
                  <div className="nav-group-label">{s.navGroup}</div>
                )}
                <button
                  type="button"
                  className={`nav-item ${active === s.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(s.id)}
                >
                  {s.label}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <a href="/" className="back-link">
            ← Back to App
          </a>
        </div>
      </aside>

      <main className="content">
        {SECTIONS.map((s) => {
          const Comp = s.component;
          return (
            <section id={`section-${s.id}`} key={s.id}>
              <Comp />
            </section>
          );
        })}
      </main>
    </StyledLibrary>
  );
}

const StyledLibrary = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }: { theme: ThemeType }) => theme.pageBg};
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};

  .sidebar {
    width: 240px;
    flex-shrink: 0;
    background: ${({ theme }: { theme: ThemeType }) => theme.shellBg};
    border-right: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.divider};
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    overflow-y: auto;
  }

  .sidebar-header {
    padding: 0 20px 24px;
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.divider};

    h1 {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 18px;
      margin: 0 0 4px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    p {
      margin: 0;
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
  }

  .sidebar-nav {
    flex: 1;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-group-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    padding: 12px 12px 6px;
    margin-top: 4px;

    &:first-child {
      padding-top: 0;
      margin-top: 0;
    }
  }

  .nav-item {
    background: none;
    border: none;
    text-align: left;
    padding: 10px 12px;
    border-radius: 8px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }

    &.active {
      background: ${({ theme }: { theme: ThemeType }) => theme.tabTrack};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
      outline-offset: 2px;
    }
  }

  .sidebar-footer {
    padding: 16px 20px;
    border-top: 1px solid ${({ theme }: { theme: ThemeType }) => theme.divider};
  }

  .back-link {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 13px;
    text-decoration: none;
    border-radius: 4px;
    &:hover {
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
    &:focus-visible {
      outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
      outline-offset: 2px;
    }
  }

  .content {
    flex: 1;
    min-width: 0;
    padding: 32px 40px 48px;
    max-width: 1200px;

    section {
      margin-bottom: 48px;
      scroll-margin-top: 24px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-item {
      transition: none;
    }
  }
`;
