import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { CommonToken } from 'src/constants/interface';
import { isEth } from 'src/ethers/utils';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useIsDAChainGasToken } from 'src/state/swap/tokens/hook';
import { ThemeType } from 'src/theme';
import { formatAddress } from 'src/utils/format';

import IconRightOutlined from '../Icons/RightOutlined';
import TokenSites from './tokenSites';

export default function AssetAddress({
  token,
  swapPair,
}: {
  token: CommonToken;
  swapPair?: any;
}) {
  const intl = useIntl();

  const isChainNativeToken = useIsDAChainGasToken({ token });
  const isNoTokenContract = useMemo(() => {
    return isEth({ code: token?.code }) || isChainNativeToken;
  }, [token?.code, isChainNativeToken]);

  const showModal = useShowModal();
  const showInfoModal = useCallback(() => {
    showModal({ modal: ModalKeys.swapPairCode, pair: swapPair });
  }, [showModal, swapPair]);

  return (
    <StyledAddress className="address">
      <TokenSites token={token} />

      {!isNoTokenContract && (
        <div className="contract-address">
          <div className="contract-address-title">{intl.Token_Contract}</div>
          <div
            className={`contract-address-value ${
              swapPair ? 'cursor-pointer' : ''
            }`}
            onClick={() => {
              if (swapPair) {
                showInfoModal();
              }
            }}
          >
            {formatAddress(token?.code)} {swapPair && <IconRightOutlined />}
          </div>
        </div>
      )}
    </StyledAddress>
  );
}

const StyledAddress = styled.div`
  width: 100%;
  padding: 0 20px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .contract-address {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    .contract-address-title {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }

  .self-custodied {
    margin-top: auto;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
    gap: 4px;
    .icon-m-top-info {
      margin-top: 3px;
    }
    b {
      text-decoration: underline dotted;
      text-underline-offset: 4px;
      cursor: pointer;
    }
  }
`;
