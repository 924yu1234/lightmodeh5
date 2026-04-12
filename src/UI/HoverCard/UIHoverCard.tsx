import React from 'react';
import { HoverCard, HoverCardProps } from '@mantine/core';
import { createGlobalStyle } from 'styled-components';

export type UIHoverCardProps = HoverCardProps;

const HoverCardGlobalStyle = createGlobalStyle`
  .mantine-HoverCard-dropdown {
    padding: 10px 0;
    font-family: OpenSansRegular, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    min-height: auto;
    background-color: ${({ theme }) => theme.bgMenu};
    color: ${({ theme }) => theme.t_b7b};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: none;
    white-space: normal;
    word-break: break-word;
  }

  .mantine-HoverCard-arrow {
    border-color: ${({ theme }) => theme.bgMenu};
  }
`;

function UIHoverCardBase(props: UIHoverCardProps) {
  return (
    <>
      <HoverCardGlobalStyle />
      <HoverCard {...props} />
    </>
  );
}

const UIHoverCard = Object.assign(UIHoverCardBase, {
  Target: HoverCard.Target,
  Dropdown: HoverCard.Dropdown,
});

export default UIHoverCard;
