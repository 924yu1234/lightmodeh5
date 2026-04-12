import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useIsDAChainGasToken } from 'src/state/swap/tokens/hook';
import { formatTokenCode } from 'src/utils/format';

import { useIntl } from 'js/locals';
import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function SwapPairCode({ pair }: { pair: any }) {
  const { baseToken } = pair;
  const intl = useIntl();

  const showModal = useShowModal();
  const showInfoModal = useCallback(() => {
    showModal({ modal: ModalKeys.swapPairCode, pair });
  }, [showModal, pair]);

  const isDAChainGasToken = useIsDAChainGasToken({ token: baseToken });

  return (
    <StyledPairInfo onClick={showInfoModal}>
      <div className="pair-info-inner">
        <div className="pair-info-label">{intl['trade.token_info']}</div>
        <div className="pair-info-value">
          <div className="pair-info-code">
            {isDAChainGasToken
              ? baseToken?.symbol ?? '--'
              : `${formatTokenCode(baseToken?.code, 18)}`}
          </div>
        </div>
      </div>
    </StyledPairInfo>
  );
}

export const StyledPairInfo = styled.div`
  padding: 1px 10px;
  height: 100%;
  cursor: pointer;
  border-left: 1px solid ${(props) => props.theme.innerBorder};
  border-right: 1px solid ${(props) => props.theme.innerBorder};
  margin: 0 10px;
  .pair-info-inner {
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    &:hover {
      background: ${(props) => props.theme.menuHover};
    }
  }

  .pair-info-label {
    ${(props) => props.theme.fontRegular};
    font-size: 12px;
    color: ${(props) => props.theme.t_b7b};
    letter-spacing: 0;
    line-height: 18px;
    display: flex;
    align-items: center;
    .wrap-tag {
      height: 16px;
    }
  }
  .pair-info-value {
    .pair-info-code {
      ${(props) => props.theme.fontBold};
      font-size: 12px;
      line-height: 18px;
      color: ${(props) => props.theme.t_fff};
      letter-spacing: 0;
      text-decoration: underline;
    }
    display: flex;
    align-items: center;
    .icon-popup-warning {
      margin-left: 5px;
    }
  }

  .line {
    margin: ${(props) => (props.theme.viewWidth < 1100 ? '0 15px' : '0 20px')};
    width: 1px;
    height: 100%;
    background: ${(props) => props.theme.innerBorder};
  }
`;
