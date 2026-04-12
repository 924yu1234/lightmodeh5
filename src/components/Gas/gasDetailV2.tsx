import React, { useMemo, useState } from 'react';
import { formatUnits } from '@ethersproject/units';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatNetworFeeValue } from 'src/utils/format';
import { multiply, plus } from 'src/utils/numberUtils';

import IconDown from '../Icons/downIcon';
import TokenIcon from '../Token/icon';

export default function GasDetailV2({ gas_data }: { gas_data: any }) {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const {
    user_gas_estimated = [],
    user_gas_used = [],
    user_pay_estimated = [],
    solver_gas_used = [],
  } = gas_data || {};
  const { tokens: estimateTokens, estimateValue } = useMemo(() => {
    let estimateValue = 0;
    const tokensMap = user_gas_estimated
      .filter((item: any) => item.gas_enough)
      .concat(user_pay_estimated)
      .reduce((acc: any, item: any) => {
        const key = `${item.token.code}_${item.token.chain}`;
        const _amount = formatUnits(item.amount, item.token.decimals);
        const price = acc[key]?.price || item.price;
        const value = multiply(_amount, price);
        estimateValue = plus(estimateValue, value) as any;

        if (acc[key]) {
          acc[key].amount = plus(acc[key].amount, _amount) as any;
          acc[key].price = price;
          return acc;
        }
        return {
          ...acc,
          [key]: {
            ...item,
            amount: _amount,
            price: item.price,
          },
        };
      }, {});

    return {
      tokens: Object.values(tokensMap),
      estimateValue,
    };
  }, [user_gas_estimated, user_pay_estimated]);

  const { tokens: usedTokens, usedValue } = useMemo(() => {
    let usedValue = 0;
    const tokensMap = user_gas_used
      .concat(solver_gas_used)
      .reduce((acc: any, item: any) => {
        const key = `${item.token.code}_${item.token.chain}`;
        const _amount = formatUnits(item.amount, item.token.decimals);
        const price = acc[key]?.price || item.price;
        const value = multiply(_amount, price);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        usedValue = plus(usedValue, value) as any;
        if (acc[key]) {
          acc[key].amount = plus(acc[key].amount, _amount) as any;
          acc[key].price = price;
          return acc;
        }
        return {
          ...acc,
          [key]: {
            ...item,
            amount: _amount,
            price: item.price,
          },
        };
      }, {});

    return {
      tokens: Object.values(tokensMap),
      usedValue,
    };
  }, [user_gas_used, solver_gas_used]);

  if (!estimateTokens?.length) return null;

  return (
    <StyledGasDetailV2>
      <div
        className={`gas-detail-v2 ${show ? 'show' : ''}`}
        onClick={() => setShow(!show)}
      >
        <div className="label">{intl.network_fee}</div>
        <div className="value">
          ${formatNetworFeeValue(usedValue)}
          <IconDown className="down-icon" rotate={show} />
        </div>
      </div>
      {show && (
        <div className="gas-details">
          <div>
            <div className="gas-details-label">
              {intl.estimated}
              <div className="gas-details-value">
                ${formatNetworFeeValue(estimateValue)}
              </div>
            </div>
            <div className="tokens-list">
              {estimateTokens.map((item: any) => (
                <div key={item.token.token_id} className="token">
                  <TokenIcon token={item.token} size={16} />
                  <span>{item.amount}</span>
                  {item.token.symbol}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div className="gas-details-label">
              {intl.actual}
              <div className="gas-details-value">
                ${formatNetworFeeValue(usedValue)}
              </div>
            </div>
            <div className="tokens-list">
              {usedTokens.map((item: any) => (
                <div key={item.token.token_id} className="token">
                  <TokenIcon token={item.token} size={16} />
                  <span>{item.amount}</span>
                  {item.token.symbol}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </StyledGasDetailV2>
  );
}

const StyledGasDetailV2 = styled.div`
  width: 100%;
  .gas-detail-v2 {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    &.show .down-icon {
      transform: rotate(180deg);
    }
    .label {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b_80};
      line-height: 18px;
      margin-right: auto;
    }
    .value {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_fff};
      line-height: 18px;
      display: flex;
      align-items: center;
      word-break: break-word;
      text-align: end;
      gap: 5px;
    }
  }
  .gas-details {
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 10px;
    gap: 10px;
    border: 1px solid ${({ theme }) => theme.border_b7b_20};
    border-radius: 8px;
    padding: 15px;
    .gas-details-label {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b_80};
      line-height: 18px;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
    }
    .gas-details-value {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_fff};
      line-height: 18px;
    }

    .tokens-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .token {
      display: flex;
      align-items: center;
      gap: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_fff};
      line-height: 18px;
    }
  }
`;
