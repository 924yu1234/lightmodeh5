import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useTotalAssetValue } from 'src/hooks/useAssets';
import { useIsPrivy } from 'src/hooks/useWalletHooks';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useThemeParams } from 'src/theme';
import { isLessOrEqualThan } from 'src/utils/numberUtils';

import IconRightOutlined from '../Icons/RightOutlined';
import IconPopupWarning from '../Icons/Warning';

export default function ExcessiveBalanceTipsEntry() {
  const totalAsset = useTotalAssetValue();

  const intl = useIntl();
  const showModal = useShowModal();
  const isPrivy = useIsPrivy();
  const { isMobile } = useThemeParams();

  const show = useMemo(() => {
    return isLessOrEqualThan(isPrivy ? 3000 : 10000, totalAsset);
  }, [isPrivy, totalAsset]);

  if (!show) return null;

  return (
    <StyledExcessiveBalanceTipsEntry
      className="excessive-balance-tips-entry"
      onClick={() => {
        showModal({ modal: ModalKeys.tips_excessiveBalance });
      }}
    >
      <div className="excessive-balance-tips-entry-content">
        <IconPopupWarning size={isMobile ? 24 : 18} />
        {intl.warning_excessive_balance_detected}
        <IconRightOutlined />
      </div>
    </StyledExcessiveBalanceTipsEntry>
  );
}

const StyledExcessiveBalanceTipsEntry = styled.div`
  height: 50px;
  .excessive-balance-tips-entry-content {
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    background: ${({ theme }) => theme.bg_white_05};
    border: 1px solid ${({ theme }) => theme.border_b7b_20};
    border-radius: 4px;
    padding: 10px;
  }
  .icon-right-outlined {
    margin-left: auto;
  }
`;
