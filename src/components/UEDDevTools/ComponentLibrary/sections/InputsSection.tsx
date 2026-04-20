import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { Input, Textarea } from 'src/UI';

import IconArrowDown from 'src/components/Icons/arrowDown';
import IconBalance from 'src/components/Icons/balance';
import IconExchange from 'src/components/Icons/exchange';
import IconSearch from 'src/components/Icons/serch';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

/** Shared input class so Swap Pay + Bridge From placeholder beats UIInput `theme.placeholder`. */
const UED_SWAP_PAY_AMOUNT_CLASS = 'ued-swap-pay-amount-field';

function AmountTokenChipDemo({ symbol }: { symbol: string }) {
  return (
    <span className="ui-amount-token-chip">
      <span className="ui-amount-token-thumb" aria-hidden />
      <span>{symbol}</span>
      <span className="ui-amount-token-chevron" aria-hidden>
        ▾
      </span>
    </span>
  );
}

/** Token selector pill — Swap Pay (flat) or Bridge (stacked token + chain); full pill radius. */
function SwapPayTokenPill({
  symbol,
  chain,
}: {
  symbol: string;
  chain?: string;
}) {
  return (
    <SwapPayTokenPillRoot $hasChain={!!chain}>
      <span className="tok-usd" aria-hidden>
        $
      </span>
      {chain ? (
        <div className="tok-stacked">
          <span className="tok-label">{symbol}</span>
          <span className="tok-chain">{chain}</span>
        </div>
      ) : (
        <span className="tok-label">{symbol}</span>
      )}
      <IconArrowDown size={10} className="tok-chev" />
    </SwapPayTokenPillRoot>
  );
}

export default function InputsSection() {
  const intl = useIntl();
  const [text, setText] = useState('');
  const [amountTokenOnly, setAmountTokenOnly] = useState('');
  const [amountWithMax, setAmountWithMax] = useState('1,000');
  const [homeSearch, setHomeSearch] = useState('');
  const [swapPay, setSwapPay] = useState('');
  const [bridgeFromAmt, setBridgeFromAmt] = useState('');
  const [textarea, setTextarea] = useState('');

  return (
    <StyledSection>
      <h2 className="section-title">Inputs</h2>

      <ComponentCard
        title="Input"
        description="Default / Error / Home search: default Input uses same light-mode chrome as Amount + token (theme.cardBorder, theme.cardBg, theme.componentLibraryCardShadow). Error: err-border + 12px red hint 8px below (theme.red). Home search: one pill chrome (HomeSearchShell border + bg; resting shadow off to avoid double edge); inner unstyled; 16px inset, 8px icon–text. Demo strip is borderless (no extra frame)."
      >
        <div className="grid">
          <div className="item">
            <span className="label">Default</span>
            <Input
              placeholder="0"
              inputMode="decimal"
              value={text}
              onChange={(e: any) => setText(e.currentTarget.value)}
            />
          </div>
          <div className="item">
            <span className="label">Disabled</span>
            <Input placeholder="0" disabled />
          </div>
          <div className="item">
            <span className="label">Error state</span>
            <div className="field-with-error-hint">
              <Input placeholder="0" className="err-border" />
              <InputErrorHint role="alert">
                {intl.insufficient_balance}
              </InputErrorHint>
            </div>
          </div>
          <div className="item full-width">
            <span className="label">Home search shell</span>
            <HomeSearchDemoBar>
              <Input
                uiVariant="homeSearch"
                placeholder={intl.btn_search}
                leftSection={<IconSearch size={16} />}
                value={homeSearch}
                onChange={(e: any) => setHomeSearch(e.currentTarget.value)}
              />
            </HomeSearchDemoBar>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Amount + token (Create Position)"
        description='uiVariant="amountToken" — same default field chrome as Input (light: cardBorder, cardBg, componentLibraryCardShadow). Right section: Max (optional) + .ui-amount-token-chip (+ thumb / chevron).'
      >
        <div className="grid">
          <div className="item full-width">
            <span className="label">Token only (no Max)</span>
            <Input
              uiVariant="amountToken"
              placeholder="0"
              inputMode="decimal"
              value={amountTokenOnly}
              onChange={(e: any) => setAmountTokenOnly(e.currentTarget.value)}
              rightSection={<AmountTokenChipDemo symbol="USDC" />}
            />
          </div>
          <div className="item full-width">
            <span className="label">Max + token</span>
            <Input
              uiVariant="amountToken"
              placeholder="0"
              inputMode="decimal"
              value={amountWithMax}
              onChange={(e: any) => setAmountWithMax(e.currentTarget.value)}
              rightSection={
                <>
                  <span className="ui-amount-max" role="button" tabIndex={0}>
                    {intl.btn_max}
                  </span>
                  <AmountTokenChipDemo symbol="USDC" />
                </>
              }
            />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Swap — Pay field"
        description="Default + Error: hint is 12px theme.red, 8px below the gray card shell (outside swap-input-inner). Error card uses err-border on shell + input."
      >
        <PayFieldVariants>
          <div>
            <span className="pay-variant-label">Default</span>
            <SwapPayBlock>
              <div className="swap-input-inner">
                <div className="pay-title">{intl.pay}</div>
                <div className="pay-content">
                  <Input
                    classNames={{ input: UED_SWAP_PAY_AMOUNT_CLASS }}
                    placeholder="0"
                    inputMode="decimal"
                    value={swapPay}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSwapPay(e.currentTarget.value)
                    }
                    rightSection={<SwapPayTokenPill symbol="USDC" />}
                  />
                </div>
                <div className="pay-footer">
                  <div className="pay-footer-row">
                    <IconBalance size={18} />
                    <span className="bal-line">1921.21 USDC</span>
                    <SwapPayMax type="button">{intl.btn_max}</SwapPayMax>
                  </div>
                </div>
              </div>
            </SwapPayBlock>
          </div>
          <div>
            <span className="pay-variant-label">Error</span>
            <SwapPayBlock>
              <div className="swap-input-inner err-border">
                <div className="pay-title">{intl.pay}</div>
                <div className="pay-content">
                  <Input
                    classNames={{ input: UED_SWAP_PAY_AMOUNT_CLASS }}
                    className="err-border"
                    placeholder="0"
                    inputMode="decimal"
                    value="0.00"
                    readOnly
                    rightSection={<SwapPayTokenPill symbol="USDC" />}
                  />
                </div>
                <div className="pay-footer">
                  <div className="pay-footer-row">
                    <IconBalance size={18} />
                    <span className="bal-line">1921.21 USDC</span>
                    <SwapPayMax type="button">{intl.btn_max}</SwapPayMax>
                  </div>
                </div>
              </div>
              <InputErrorHint role="alert">
                {intl.insufficient_balance}
              </InputErrorHint>
            </SwapPayBlock>
          </div>
        </PayFieldVariants>
      </ComponentCard>

      <ComponentCard
        title="Bridge — From / To"
        description="Default + Error: red hint 12px theme.red, 8px below To card outer border only (outside bridge-card-inner). From keeps input err-border; To shell err-border. Exchange between From and To."
      >
        <PayFieldVariants>
          <div>
            <span className="pay-variant-label">Default</span>
            <BridgeStack>
              <BridgeFromBlock>
                <div className="bridge-card-inner">
                  <div className="bridge-title-row">
                    <span className="bridge-section-label">{intl.From}</span>
                    <div className="bridge-balance">
                      <SwapPayMax type="button">{intl.btn_max}</SwapPayMax>
                      <span className="bal-num">2,500</span>
                      <span className="bal-sym">USDC</span>
                    </div>
                  </div>
                  <div className="bridge-pay-row">
                    <Input
                      classNames={{ input: UED_SWAP_PAY_AMOUNT_CLASS }}
                      placeholder="0"
                      inputMode="decimal"
                      value={bridgeFromAmt}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setBridgeFromAmt(e.currentTarget.value)
                      }
                    />
                    <SwapPayTokenPill symbol="USDC" chain="Ethereum" />
                  </div>
                </div>
              </BridgeFromBlock>

              <BridgeExchangeRow>
                <button
                  type="button"
                  className="bridge-exchange-btn"
                  aria-label={intl.icon_switch}
                >
                  <IconExchange size={20} />
                </button>
              </BridgeExchangeRow>

              <BridgeToBlock>
                <div className="bridge-card-inner">
                  <div className="bridge-title-row">
                    <span className="bridge-section-label">{intl.To}</span>
                    <div className="bridge-balance">
                      <span className="bal-num">0</span>
                      <span className="bal-sym">USDC</span>
                    </div>
                  </div>
                  <div className="bridge-pay-row">
                    <div className="amount-readonly">
                      {bridgeFromAmt || '0'}
                    </div>
                    <SwapPayTokenPill symbol="USDC" chain="Arbitrum" />
                  </div>
                </div>
              </BridgeToBlock>
            </BridgeStack>
          </div>
          <div>
            <span className="pay-variant-label">Error</span>
            <BridgeStack>
              <BridgeFromBlock>
                <div className="bridge-card-inner">
                  <div className="bridge-title-row">
                    <span className="bridge-section-label">{intl.From}</span>
                    <div className="bridge-balance">
                      <SwapPayMax type="button">{intl.btn_max}</SwapPayMax>
                      <span className="bal-num">2,500</span>
                      <span className="bal-sym">USDC</span>
                    </div>
                  </div>
                  <div className="bridge-pay-row">
                    <Input
                      classNames={{ input: UED_SWAP_PAY_AMOUNT_CLASS }}
                      className="err-border"
                      placeholder="0"
                      inputMode="decimal"
                      value="9999.99"
                      readOnly
                    />
                    <SwapPayTokenPill symbol="USDC" chain="Ethereum" />
                  </div>
                </div>
              </BridgeFromBlock>

              <BridgeExchangeRow>
                <button
                  type="button"
                  className="bridge-exchange-btn"
                  aria-label={intl.icon_switch}
                >
                  <IconExchange size={20} />
                </button>
              </BridgeExchangeRow>

              <BridgeToWithHint>
                <BridgeToBlock>
                  <div className="bridge-card-inner err-border">
                    <div className="bridge-title-row">
                      <span className="bridge-section-label">{intl.To}</span>
                      <div className="bridge-balance">
                        <span className="bal-num">0</span>
                        <span className="bal-sym">USDC</span>
                      </div>
                    </div>
                    <div className="bridge-pay-row">
                      <div className="amount-readonly">9999.99</div>
                      <SwapPayTokenPill symbol="USDC" chain="Arbitrum" />
                    </div>
                  </div>
                </BridgeToBlock>
                <InputErrorHint role="alert">
                  {intl.insufficient_balance}
                </InputErrorHint>
              </BridgeToWithHint>
            </BridgeStack>
          </div>
        </PayFieldVariants>
      </ComponentCard>

      <ComponentCard
        title="Textarea"
        description="Same default chrome as Input / Amount + token in light mode (theme.cardBorder, theme.cardBg, theme.componentLibraryCardShadow)."
      >
        <div className="grid">
          <div className="item">
            <span className="label">Default</span>
            <Textarea
              placeholder="Enter notes..."
              value={textarea}
              onChange={(e: any) => setTextarea(e.currentTarget.value)}
            />
          </div>
          <div className="item">
            <span className="label">Disabled</span>
            <Textarea placeholder="Disabled" disabled />
          </div>
        </div>
      </ComponentCard>
    </StyledSection>
  );
}

/** Layout only — no second frame around the pill (chrome is only `HomeSearchShell`). */
const HomeSearchDemoBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px 0 12px;
  min-height: 52px;
  max-width: 440px;
  background: transparent;
  border: none;

  .mantine-Input-wrapper {
    flex: 1;
    margin-left: 10px;
    min-width: 0;
  }
`;

const StyledSection = styled.div`
  .section-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin: 0 0 16px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .full-width {
    grid-column: 1 / -1;
  }
  .item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .label {
    font-size: 11px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .field-with-error-hint {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const InputErrorHint = styled.p`
  margin: 8px 0 0;
  padding: 0;
  width: 100%;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }: { theme: ThemeType }) => theme.red};
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
`;

const PayFieldVariants = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 440px;

  .pay-variant-label {
    display: block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    margin-bottom: 8px;
  }
`;

const swapPayCardInner = css`
  background: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.bg_white_10 : theme.cardBg};
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.border_transparent : theme.cardBorder};
  border-radius: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? '8px' : theme.buttonRadius};
  box-shadow: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
  padding: 14px 16px 12px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputHoverBorder};
  }

  &:focus-within {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputFocusBorder};
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.homeSearchActiveShadow};
  }
`;

/** Shell + focus ring when `.err-border` on same node as swapPayCardInner. */
const shellErrBorder = css`
  &.err-border {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.border_sell_important} !important;

    &:hover {
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.border_sell_important} !important;
    }

    &:focus-within {
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.border_sell_important} !important;
      box-shadow: none !important;
    }
  }
`;

const SwapPayTokenPillRoot = styled.span<{ $hasChain?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  min-height: ${({ $hasChain }) => ($hasChain ? 40 : 36)}px;
  height: auto;
  padding: ${({ $hasChain }) =>
    $hasChain ? '6px 10px 6px 6px' : '4px 10px 4px 6px'};
  border-radius: 999px;
  cursor: default;
  background: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.bg_b7b_10 : theme.segmentedCompactTrackBg};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
  transition: background-color 0.15s ease, border-color 0.15s ease;

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.tabTrack};
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.inputHoverBorder};
    }
  }

  .tok-usd {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ theme }: { theme: ThemeType }) => theme.blue};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    font-size: 12px;
    line-height: 1;
  }

  .tok-stacked {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }

  .tok-label {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 16px;
    line-height: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
  }

  .tok-chain {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 12px;
    line-height: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }

  .tok-chev {
    color: ${({ theme }: { theme: ThemeType }) => theme.mutedText};
    margin-left: 2px;
    flex-shrink: 0;
  }
`;

const SwapPayMax = styled.button`
  border: none;
  margin: 0;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  font-size: 13px;
  line-height: 18px;
  color: ${({ theme }: { theme: ThemeType }) => theme.green};
  transition: background-color 0.15s ease;

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.infoBarBg};
    }
  }

  &:active {
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.segmentedCompactActiveBg};
  }
`;

const SwapPayBlock = styled.div`
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .${UED_SWAP_PAY_AMOUNT_CLASS}::placeholder,
    .${UED_SWAP_PAY_AMOUNT_CLASS}::-webkit-input-placeholder {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
    opacity: 1;
  }

  .swap-input-inner {
    ${swapPayCardInner}
    ${shellErrBorder}
    min-height: 96px;
  }

  .pay-title {
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 8px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_b7b_60 : theme.green};
  }

  .pay-content {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    min-height: 40px;

    .mantine-TextInput-root {
      flex: 1;
      min-width: 0;
    }

    .mantine-Input-input {
      min-height: 36px;
      height: auto;
      padding-left: 0;
      padding-right: 4px;
      font-size: 22px;
      line-height: 28px;
      text-align: left;
      border: none !important;
      box-shadow: none !important;
      background: transparent !important;
      color: ${({ theme }: { theme: ThemeType }) => theme.input};
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    }

    .mantine-Input-section[data-position='right'] {
      width: auto;
      margin: 0;
      padding-right: 0;
      align-self: center;
    }
  }

  .pay-footer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 13px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }

  .pay-footer-row {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .bal-line {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }

  .icon-balance {
    flex-shrink: 0;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }
`;

const BridgeStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 420px;
`;

/** Wraps To card + outer error hint (8px below To shell border). */
const BridgeToWithHint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const bridgePayInput = css`
  .mantine-TextInput-root {
    flex: 1;
    min-width: 0;
  }

  .mantine-Input-input {
    min-height: 36px;
    height: auto;
    padding-left: 0;
    padding-right: 4px;
    font-size: 22px;
    line-height: 28px;
    text-align: left;
    border: none !important;
    box-shadow: none !important;
    background: transparent !important;
    color: ${({ theme }: { theme: ThemeType }) => theme.input};
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  }

  .mantine-Input-section[data-position='right'] {
    width: auto;
    margin: 0;
    padding-right: 0;
    align-self: center;
  }
`;

const BridgeFromBlock = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .${UED_SWAP_PAY_AMOUNT_CLASS}::placeholder,
    .${UED_SWAP_PAY_AMOUNT_CLASS}::-webkit-input-placeholder {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
    opacity: 1;
  }

  .bridge-card-inner {
    ${swapPayCardInner}
    ${shellErrBorder}
    min-height: 96px;
  }

  .bridge-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
  }

  .bridge-section-label {
    font-size: 13px;
    line-height: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_b7b_60 : theme.green};
  }

  .bridge-balance {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }

  .bridge-pay-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 40px;
    ${bridgePayInput}
  }
`;

const BridgeExchangeRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
  margin-bottom: -10px;
  position: relative;
  z-index: 2;

  .bridge-exchange-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    padding: 0;
    cursor: pointer;
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_b7b_30};
    background: ${({ theme }: { theme: ThemeType }) => theme.bg};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    transition: background-color 0.15s ease, border-color 0.15s ease,
      color 0.15s ease;

    @media (hover: hover) {
      &:hover {
        background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};
        border-color: ${({ theme }: { theme: ThemeType }) =>
          theme.inputHoverBorder};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }

    &:active {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    }
  }

  .icon-exchange {
    display: flex;
  }
`;

const BridgeToBlock = styled.div`
  margin-top: -10px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .bridge-card-inner {
    ${swapPayCardInner}
    ${shellErrBorder}
    min-height: 96px;
  }

  .bridge-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
  }

  .bridge-section-label {
    font-size: 13px;
    line-height: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_b7b_60 : theme.green};
  }

  .bridge-balance {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }

  .bridge-pay-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 40px;
  }

  .amount-readonly {
    flex: 1;
    min-width: 0;
    font-size: 22px;
    line-height: 28px;
    text-align: left;
    color: ${({ theme }: { theme: ThemeType }) => theme.input};
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  }
`;
