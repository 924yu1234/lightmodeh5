import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useShowDataWarning } from 'src/state/swap/pair/hooks';
import { ThemeType } from 'src/theme';

import IconRedWarning from '../Icons/redWarning';
import IconRightOutlined from '../Icons/RightOutlined';

export default function SwapDataWarning() {
  const intl = useIntl();
  const showModal = useShowModal();
  const showDataWarning = useShowDataWarning();
  if (!showDataWarning) return null;

  return (
    <StyledDiv
      className="swap-data-warning"
      onClick={() => {
        showModal({ modal: ModalKeys.swapDataWarning });
      }}
    >
      <IconRedWarning />
      {intl.Warning}
      <IconRightOutlined />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  background: ${({ theme }: { theme: ThemeType }) => theme.sell_20};
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  color: ${({ theme }: { theme: ThemeType }) => theme.red};
  font-size: 14px;
  border-radius: 15px;
  height: 30px;
  padding: 0 10px;
  border-radius: 5px;
  .icon-red-warning {
    margin-right: 5px;
  }
  .icon-right-outlined {
    margin-left: 5px;
  }
`;
