import React, { useState } from 'react';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import { useIntl } from 'src/locals';
import { isNumber } from 'src/utils/digit';
import { formatNetworFeeValue } from 'src/utils/format';
import { isLessOrEqualThan, minus } from 'src/utils/numberUtils';

import IconDown from '../Icons/downIcon';
import GasDetailV2 from './gasDetailV2';

export default function GasDetailsInDetail({
  gas_data,
  net_fee_estimated,
  net_fee_used,
  children,
}: {
  gas_data: any;
  net_fee_estimated: string;
  net_fee_used: string;
  children?: React.ReactNode;
}) {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  if (gas_data && gas_data?.user_gas_estimated) {
    return <GasDetailV2 gas_data={gas_data} />;
  }
  if (!isNumber(net_fee_estimated)) return <>{children}</>;
  const used = formatNetworFeeValue(net_fee_used);
  const estimated = formatNetworFeeValue(net_fee_estimated);
  let refund = formatNetworFeeValue(minus(estimated, used));
  if (isLessOrEqualThan(refund, 0)) {
    refund = '0';
  }
  return (
    <StyledGasDetails className="network-fee-detail">
      <div
        className={`network-fee item ${show ? 'show' : ''}`}
        onClick={() => setShow(!show)}
      >
        <div className="label">{intl.network_fee}</div>
        <div className="value">
          ${used}
          <IconDown className="down-icon" />
        </div>
      </div>
      {show && (
        <div className="gas-details">
          <div className="item">
            <div className="label">{intl.estimated_fee}</div>
            <div className="value">${estimated}</div>
          </div>
          <div className="item">
            <div className="label">{intl.actual_fee}</div>
            <div className="value">${used || '--'}</div>
          </div>
          <div className="item">
            <div className="label">{intl.refund}</div>
            <div className="value">
              <Tooltip
                label={intl.gas_refund_tips}
                events={{
                  hover: true,
                  touch: true,
                  focus: true,
                }}
              >
                <div className="text-underline-dotted">${refund || '--'}</div>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </StyledGasDetails>
  );
}

const StyledGasDetails = styled.div`
  width: 100%;
  .network-fee {
    cursor: pointer;
  }

  .item {
    display: flex;
    align-items: center;
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
    padding: 10px 15px;
    margin-bottom: 15px;
    border: 1px solid ${({ theme }) => theme.border_b7b_20};
    border-radius: 8px;
    .item:last-child {
      margin-bottom: 0;
    }
    .refend {
    }
  }
`;
