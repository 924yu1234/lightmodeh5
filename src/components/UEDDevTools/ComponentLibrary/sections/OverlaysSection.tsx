import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Drawer,
  GhostBtn,
  HoverCard,
  Modal,
  Popover,
  PrimaryBtn,
  Tooltip,
} from 'src/UI';

import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

export default function OverlaysSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <StyledSection>
      <h2 className="section-title">Overlays</h2>

      <ComponentCard
        title="Modal"
        description="Centered modal dialog. PC: 460px, Mobile: 355px."
      >
        <PrimaryBtn onClick={() => setModalOpen(true)}>Open Modal</PrimaryBtn>
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Modal Title"
          centered
        >
          <div className="modal-body">
            <p>This is a modal content area.</p>
            <p>You can put any content here.</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <GhostBtn onClick={() => setModalOpen(false)}>Cancel</GhostBtn>
              <PrimaryBtn onClick={() => setModalOpen(false)}>OK</PrimaryBtn>
            </div>
          </div>
        </Modal>
      </ComponentCard>

      <ComponentCard
        title="Drawer"
        description="Side drawer (slides in from the right)."
      >
        <PrimaryBtn onClick={() => setDrawerOpen(true)}>Open Drawer</PrimaryBtn>
        <Drawer
          opened={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Settings"
          position="right"
        >
          <div className="modal-body">
            <p>Drawer content goes here.</p>
          </div>
        </Drawer>
      </ComponentCard>

      <ComponentCard
        title="Popover"
        description="Click-triggered floating panel."
      >
        <Popover
          opened={popoverOpen}
          onChange={setPopoverOpen}
          position="bottom"
        >
          <Popover.Target>
            <PrimaryBtn onClick={() => setPopoverOpen((o) => !o)}>
              Click for Popover
            </PrimaryBtn>
          </Popover.Target>
          <Popover.Dropdown>
            <div className="popover-content">
              <strong>Popover</strong>
              <p>Click outside to close.</p>
            </div>
          </Popover.Dropdown>
        </Popover>
      </ComponentCard>

      <ComponentCard
        title="Tooltip"
        description="Hover-triggered text tooltip."
      >
        <div className="row">
          <Tooltip label="This is a tooltip">
            <span className="hover-target">Hover me</span>
          </Tooltip>
          <Tooltip
            label="Multi-line tooltip with longer text content"
            multiline
          >
            <span className="hover-target">Multi-line hover</span>
          </Tooltip>
        </div>
      </ComponentCard>

      <ComponentCard
        title="HoverCard"
        description="Hover-triggered floating card with rich content."
      >
        <HoverCard>
          <HoverCard.Target>
            <span className="hover-target">Hover for card</span>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <div className="popover-content">
              <strong>Hover Card</strong>
              <p>This card appears on hover and stays while hovering.</p>
            </div>
          </HoverCard.Dropdown>
        </HoverCard>
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
  .row {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .modal-body {
    padding: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    p {
      margin: 0 0 8px;
    }
  }
  .popover-content {
    padding: 12px 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 13px;
    strong {
      display: block;
      margin-bottom: 4px;
    }
    p {
      margin: 0;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
  }
  .hover-target {
    padding: 8px 16px;
    background: ${({ theme }: { theme: ThemeType }) => theme.panelBg};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    user-select: none;
  }
`;
