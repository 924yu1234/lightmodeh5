import React, { useState } from 'react';
import styled from 'styled-components';

import UEDSettingsPanel from './UEDSettingsPanel';

export default function UEDSettingsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledButton
        onClick={() => setOpen((prev) => !prev)}
        title="UED Settings"
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
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(30, 30, 50, 0.9);
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.15s ease;
  &:hover {
    transform: scale(1.1);
    background: rgba(50, 50, 80, 0.95);
  }
`;
