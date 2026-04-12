import React, { ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';

import { FloatingPosition, PortalProps, Tooltip as MTooltip } from 'src/UI';

import { useToggleWalletTradeBtn } from 'js/state/application/hooks';

export default function Tooltip({
  title,
  position = 'bottom',
  children,
  className = '',
  noWrapper = false,
  withArrow = false,
  onShow,
  onHide,
  portalProps,
}: {
  title: React.ReactNode;
  position?: FloatingPosition;
  children: ReactNode;
  className?: string;
  noWrapper?: boolean;
  withArrow?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>;
}) {
  const [opened, setOpened] = useState(false);
  const toogleWalletTrade = useToggleWalletTradeBtn();
  const show = useCallback(() => {
    if (onShow) onShow();
    setOpened(true);
    toogleWalletTrade(true);
  }, [onShow, toogleWalletTrade]);

  const hide = useCallback(() => {
    if (onHide) onHide();
    setOpened(false);
    toogleWalletTrade(false);
  }, [onHide, toogleWalletTrade]);

  if (!title) {
    return <span className={`${className} tooltip-inner`}>{children}</span>;
  }

  return (
    <MTooltip
      label={title}
      position={position}
      withArrow={withArrow}
      arrowSize={7}
      arrowOffset={4.5}
      withinPortal
      opened={opened}
      onMouseEnter={show}
      onMouseLeave={hide}
      portalProps={portalProps}
    >
      {noWrapper ? (
        children
      ) : (
        <StyledTarget className={`${className} tooltip-inner`}>
          {children}
        </StyledTarget>
      )}
    </MTooltip>
  );
}

const StyledTarget = styled.span`
  &.tooltip-inner {
    cursor: pointer;
  }
`;
