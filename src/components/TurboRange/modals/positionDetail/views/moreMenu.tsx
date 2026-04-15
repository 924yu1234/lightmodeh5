import React, { useState } from 'react';
import styled from 'styled-components';

import { UIMenu } from 'src/UI';

import IconCandle from 'src/components/Icons/candle';
import IconWrapper2 from 'src/components/Icons/IconWrapper2';
import IconMenuMore from 'src/components/Icons/menuMore';
import IconPositionHistory from 'src/components/Icons/PositionHistory';
import IconShare from 'src/components/Icons/share';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

export default function MoreMenu({
  onShare,
  onChart,
  onHistory,
}: {
  onShare: () => void;
  onChart: () => void;
  onHistory: () => void;
}) {
  const intl = useIntl();
  const [opened, setOpened] = useState(false);

  return (
    <StyledMoreMenu>
      <UIMenu
        opened={opened}
        onChange={setOpened}
        position="bottom-end"
        offset={5}
      >
        <UIMenu.Target>
          <IconWrapper2 size={32} onClick={() => setOpened((o) => !o)}>
            <IconMenuMore size={16} />
          </IconWrapper2>
        </UIMenu.Target>
        <StyledDropdown>
          <UIMenu.Item leftSection={<IconCandle size={16} />} onClick={onChart}>
            {intl.show_chart}
          </UIMenu.Item>
          <UIMenu.Item
            leftSection={<IconPositionHistory size={16} />}
            onClick={onHistory}
          >
            {intl.history}
          </UIMenu.Item>
          <UIMenu.Item leftSection={<IconShare size={16} />} onClick={onShare}>
            {intl.Share}
          </UIMenu.Item>
        </StyledDropdown>
      </UIMenu>
    </StyledMoreMenu>
  );
}

const StyledMoreMenu = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDropdown = styled(UIMenu.Dropdown)`
  &.mantine-Menu-dropdown {
    padding: 0;
  }
  .mantine-Menu-item {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    border-bottom: 1px solid rgba(58, 66, 89, 0.5);
    &:last-child {
      border-bottom: none;
    }
  }
`;
