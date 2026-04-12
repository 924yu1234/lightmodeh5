import React from 'react';
import { Tooltip, TooltipProps } from '@mantine/core';
import styled from 'styled-components';

export type UITooltipProps = TooltipProps;
export type { FloatingPosition, PortalProps } from '@mantine/core';

const StyledTooltop = styled(Tooltip)`
  &.mantine-Tooltip-tooltip {
    font-family: OpenSansRegular, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    min-height: auto;
    background-color: ${({ theme }) => theme.bgMenu};
    color: ${({ theme }) => theme.t_b7b};
    box-shadow: ${({ theme }) => theme.boxShadow};
    max-width: 250px;
    white-space: normal;
    pointer-events: auto;
    padding: 12px 16px;
  }

  .mantine-Tooltip-arrow {
    border-color: ${({ theme }) => theme.bgMenu};
  }
`;

const UITooltip = React.forwardRef<HTMLDivElement, UITooltipProps>(
  ({ className, ...props }, ref) => {
    return (
      <>
        <StyledTooltop {...props} ref={ref as any} className={className} />
      </>
    );
  }
);

UITooltip.displayName = 'UITooltip';

export default UITooltip;
