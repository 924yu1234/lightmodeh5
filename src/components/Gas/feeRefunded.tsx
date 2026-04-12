import React, { useMemo, useState } from 'react';
import { formatUnits } from '@ethersproject/units';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatNetworFeeValue } from 'src/utils/format';
import { multiply, plus } from 'src/utils/numberUtils';

import DeTooltip from '../DeTooltip';
import IconDown from '../Icons/downIcon';
import TokenIcon from '../Token/icon';

export default function FeeRefunded({
  refunded_fee,
  showTips,
}: {
  refunded_fee: any[];
  showTips?: boolean;
}) {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const { tokens, value } = useMemo(() => {
    let _value = 0;
    const tokensMap = (refunded_fee || []).reduce((acc: any, item: any) => {
      const key = `${item.code}_${item.chain}`;
      const _amount = formatUnits(item.amount, item.decimals);
      const price = acc[key]?.price || item.price;
      const value = multiply(_amount, price);
      _value = plus(_value, value) as any;

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
      value: _value,
    };
  }, [refunded_fee]);

  if (!refunded_fee?.length) return null;

  return (
    <StyledFeeRefunded className="fee-refunded">
      <div
        className={`fee-refunded-inner ${show ? 'show' : ''}`}
        onClick={() => setShow(!show)}
      >
        {showTips ? (
          <div className="label">
            <DeTooltip
              infoSize={18}
              title={intl.turboRange.fee_pre_charged}
              childrenTitle={intl.Fee_Refunded}
            />
          </div>
        ) : (
          <div className="label">{intl.Fee_Refunded}</div>
        )}
        <div className="value">
          ${formatNetworFeeValue(value)}
          <IconDown className="down-icon" rotate={show} />
        </div>
      </div>
      {show && (
        <div className="fee-refunded-details">
          <div className="fee-refunded-tokens-list">
            {tokens.map((item: any) => (
              <div key={item.token_id} className="fee-refunded-token">
                <TokenIcon token={item} size={16} />
                <span>{item.amount}</span>
                {item.symbol}
              </div>
            ))}
          </div>
        </div>
      )}
    </StyledFeeRefunded>
  );
}

const StyledFeeRefunded = styled.div`
  width: 100%;

  .fee-refunded-inner {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
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
  .fee-refunded-details {
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 10px;
    gap: 10px;
    border: 1px solid ${({ theme }) => theme.border_b7b_20};
    border-radius: 8px;
    padding: 15px;

    .fee-refunded-tokens-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .fee-refunded-token {
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
