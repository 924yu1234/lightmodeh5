import React, { useMemo } from 'react';
import styled from 'styled-components';

import { CommonToken } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import {
  useModals,
  useShowModal,
  useUsdcTokensMap,
} from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType, useThemeParams } from 'src/theme';

import IconWrapper from '../Icons/IconWrapper';
import IconRightOutlined from '../Icons/RightOutlined';

export default function UsdcSuppliedChartEntry({
  tokens,
  children,
  chain,
  onBack,
  recipent,
  amount,
  token,
}: {
  token: CommonToken;
  tokens: any[];
  children?: any;
  chain: Type_DAChains;
  onBack?: () => void;
  recipent?: string;
  amount?: string;
}) {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const showModal = useShowModal();
  const { hide } = useModals(ModalKeys.sendDetail);
  const usdcTokensMap = useUsdcTokensMap();
  const isSendFungibleUsdc = useMemo(() => {
    return (
      usdcTokensMap[chain]?.code?.toLowerCase() === token?.code?.toLowerCase()
    );
  }, [usdcTokensMap, chain, token]);
  const show = tokens?.length || isSendFungibleUsdc;

  if (!show && !isSendFungibleUsdc) return null;

  return (
    <StyledSupplied
      className="usdc-supplied"
      onClick={() => {
        if (!show) return;
        hide();
        showModal({
          modal: ModalKeys.usdc_supplied_chart_modal,
          tokens: tokens.length
            ? tokens
            : [{ ...token, amount_display: amount }],
          chain,
          onBack,
          recipent,
          amount,
        });
      }}
    >
      <div className="supplied-text">
        {isMobile ? intl.Details : children || intl.Details}

        {show && (
          <IconWrapper size={20}>
            <IconRightOutlined size={12} />
          </IconWrapper>
        )}
      </div>
    </StyledSupplied>
  );
}

const StyledSupplied = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  display: flex;
  align-items: center;
  justify-content: center;
  .supplied-text {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;
