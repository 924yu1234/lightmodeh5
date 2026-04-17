import React from 'react';
import styled from 'styled-components';

import { Input, PrimaryBtn } from 'src/UI';

import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import ChainSelect from '../ChainSelect';

interface ManageTokensAddViewProps {
  network: string;
  setNetwork: (value: string) => void;
  contractAddress: string;
  setContractAddress: (value: string) => void;
  candidateErr: string;
  candidateToken: any;
  isMyAsset: (token: any) => boolean;
  addToken: (token: any) => void;
  onBackToList: () => void;
}

export default function ManageTokensAddView({
  network,
  setNetwork,
  contractAddress,
  setContractAddress,
  candidateErr,
  candidateToken,
  isMyAsset,
  addToken,
  onBackToList,
}: ManageTokensAddViewProps) {
  const intl = useIntl();
  const alreadyAdded = candidateToken && isMyAsset(candidateToken);

  return (
    <StyledManageTokensAddView className="add-view">
      <div className="field-label">{intl.Network}</div>
      <ChainSelect
        value={network as Type_DAChains}
        onChange={(value) => setNetwork(value || '')}
      />

      <div className="field-label" style={{ marginTop: 15 }}>
        {intl.manage_tokens_contract_address}
      </div>
      <Input
        uiVariant="homeSearch"
        value={contractAddress}
        onChange={(e: any) => setContractAddress(e.target.value)}
        placeholder={intl.manage_tokens_contract_address_placeholder}
      />
      {!!candidateErr && <div className="field-tip">{candidateErr}</div>}

      <div className="preview-cards">
        <div className="preview-item">
          <span className="field-label">{intl.manage_tokens_symbol}</span>
          <span className="value">{candidateToken?.symbol || ''}</span>
        </div>
        <div className="preview-item">
          <span className="field-label">{intl.manage_tokens_decimal}</span>
          <span className="value">{candidateToken?.decimals || ''}</span>
        </div>
      </div>

      <PrimaryBtn
        eventName="manage_tokens_add_btn"
        className="action-btn primary"
        disabled={!candidateToken || !!candidateErr || alreadyAdded}
        onClick={() => {
          if (!candidateToken || candidateErr || alreadyAdded) return;
          addToken(candidateToken);
          onBackToList();
          setContractAddress('');
        }}
      >
        {intl.manage_tokens_add_btn}
      </PrimaryBtn>
    </StyledManageTokensAddView>
  );
}

const StyledManageTokensAddView = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.modalBg};
  z-index: 1;

  .field-label {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
  }

  .field-tip {
    margin-top: 5px;
    min-height: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    font-size: 13px;
    line-height: 18px;
  }

  .preview-cards {
    display: flex;
    margin-top: 10px;
    gap: 10px;
  }

  .preview-item {
    display: flex;
    flex: 1;
    align-items: flex-start;
    flex-direction: column;

    .value {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.ink};
      font-size: 14px;
      background: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.bg_white_10 : theme.shellSurfaceSecondary};
      border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
      border-radius: 8px;
      padding: 5px 16px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
    }
  }
  .dg-primary {
    margin-top: auto;
  }
`;
