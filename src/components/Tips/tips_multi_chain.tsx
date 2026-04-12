import React from 'react';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import BtnArrow from 'src/components/Icons/btnArrow';
import IconMTopInfo from 'src/components/Icons/mTopInfo';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function TipsMultiChain() {
  const intl = useIntl();

  return (
    <Tooltip label={intl.multi_chain_tips} position="bottom">
      <StyledTips className="multi-chain-tips">
        <IconMTopInfo size={12} />
        {intl.multi_chain}
        <BtnArrow size={10} />
      </StyledTips>
    </Tooltip>
  );
}

const StyledTips = styled.div`
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  padding: 0 6px;
  font-size: 12px;
  color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  width: fit-content;
  gap: 2px;
  .dg-icon {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  }
`;
