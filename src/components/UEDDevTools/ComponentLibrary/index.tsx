/**
 * UI Components Library Showcase Page
 *
 * Accessible at /ued-components — displays all src/UI components
 * with their variants and states for UED designers to reference.
 */
import React, { useState } from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

import ButtonsSection from './sections/ButtonsSection';
import DataDisplaySection from './sections/DataDisplaySection';
import InputsSection from './sections/InputsSection';
import MenuSection from './sections/MenuSection';
import OverlaysSection from './sections/OverlaysSection';
import SelectionSection from './sections/SelectionSection';
import SelectSection from './sections/SelectSection';
import TablesSection from './sections/TablesSection';
import TabsSection from './sections/TabsSection';

interface SectionDef {
  id: string;
  label: string;
  component: React.ComponentType;
}

const SECTIONS: SectionDef[] = [
  { id: 'buttons', label: 'Buttons', component: ButtonsSection },
  { id: 'inputs', label: 'Inputs', component: InputsSection },
  { id: 'selection', label: 'Selection', component: SelectionSection },
  { id: 'tabs', label: 'Tabs', component: TabsSection },
  { id: 'overlays', label: 'Overlays', component: OverlaysSection },
  { id: 'data', label: 'Data Display', component: DataDisplaySection },
  { id: 'menu', label: 'Menu', component: MenuSection },
  { id: 'select', label: 'Select', component: SelectSection },
  { id: 'tables', label: 'Tables', component: TablesSection },
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
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`nav-item ${active === s.id ? 'active' : ''}`}
              onClick={() => handleNavClick(s.id)}
            >
              {s.label}
            </button>
          ))}
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
  background: ${({ theme }: { theme: ThemeType }) => theme.bg};
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};

  .sidebar {
    width: 240px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_05};
    border-right: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_b7b_20};
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
      ${({ theme }: { theme: ThemeType }) => theme.border_b7b_20};

    h1 {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 18px;
      margin: 0 0 4px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    p {
      margin: 0;
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
  }

  .sidebar-nav {
    flex: 1;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-item {
    background: none;
    border: none;
    text-align: left;
    padding: 10px 12px;
    border-radius: 6px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_05};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }

    &.active {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    }
  }

  .sidebar-footer {
    padding: 16px 20px;
    border-top: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_b7b_20};
  }

  .back-link {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 13px;
    text-decoration: none;
    &:hover {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }

  .content {
    flex: 1;
    padding: 32px 40px;
    max-width: 1200px;

    section {
      margin-bottom: 48px;
      scroll-margin-top: 24px;
    }
  }
`;
