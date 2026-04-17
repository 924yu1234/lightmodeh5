import React, { useState } from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

import UEDSettingsPanel from './UEDSettingsPanel';

export default function UEDSettingsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledButton
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        title="UED Settings"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        ⚙
      </StyledButton>
      {open && <UEDSettingsPanel onClose={() => setOpen(false)} />}
    </>
  );
}

const StyledButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99999;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid
    ${({ theme }: { theme: ThemeType }) => theme.border_white_30};
  background: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px
    ${({ theme }: { theme: ThemeType }) => theme.border_black_80};
  transition: transform 0.15s ease-out;

  &:hover {
    transform: scale(1.06);
    background: ${({ theme }: { theme: ThemeType }) => theme.bgMenu};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;
