import React from 'react';
import styled from 'styled-components';

import { useTotalAssetValue } from 'src/hooks/useAssets';
import { ThemeType } from 'src/theme';

import { useChangeHideAssets, useIsHideAssets } from 'js/state/user/hooks';
import digit from 'js/utils/digit';

export default function TotalAsset() {
  const isHide = useIsHideAssets();
  const totalAssetValue = useTotalAssetValue();
  const changeHideAssets = useChangeHideAssets();

  return (
    <StyledTotalAasset
      className="total-asset"
      onClick={() => changeHideAssets(!isHide)}
    >
      {isHide ? '********' : `$${digit.format(totalAssetValue, '0,0.00')}`}
    </StyledTotalAasset>
  );
}

const StyledTotalAasset = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontBold};
  font-size: 16px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
`;
