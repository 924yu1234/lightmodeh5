import React from 'react';
import styled from 'styled-components';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useIsHideAssets } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

import IconRightOutlined from '../Icons/RightOutlined';

export default function AvailableDetails({ token }: { token: any }) {
  const isHideValue = useIsHideAssets();
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const { hide: hideFungibleUsdcModal } = useModals(
    ModalKeys.fungibleUsdcModal
  );
  const { hide: hideAssetModal } = useModals(ModalKeys.assetModal);

  const hasCopyTradeValue = Number(token.copyTradeAvailable) > 0;
  if (!hasCopyTradeValue) {
    return null;
  }

  return (
    <StyledAvailableDetails>
      <div className="details-item">
        <div className="details-item-title">{intl.in_address}</div>
        <div className="details-item-value">
          {isHideValue ? '****' : token.availableDisplay}
        </div>
      </div>
      <div className="details-item">
        <div
          className="details-item-title copy-trade-title"
          onClick={() => {
            hideFungibleUsdcModal();
            hideAssetModal();
            navigate('/copy-trade/account?tab=holdings');
          }}
        >
          {intl.in_copy_trade}
          <IconRightOutlined />
        </div>
        <div
          className="details-item-value copy-trade-value"
          onClick={() => {
            hideFungibleUsdcModal();
            hideAssetModal();
            navigate('/copy-trade/account?tab=holdings');
          }}
        >
          {isHideValue ? '****' : token.copyTradeAvailableDisplay || '0'}
        </div>
      </div>
    </StyledAvailableDetails>
  );
}

const StyledAvailableDetails = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  .details-item {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
    flex: 1;
  }
  .details-item-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 12px;
    line-height: 18px;
    &.copy-trade-title {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      .icon-right-outlined {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      }
    }
  }
  .details-item-value {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 18px;
  }
`;
