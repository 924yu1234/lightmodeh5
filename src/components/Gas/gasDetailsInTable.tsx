import React from 'react';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import { useIntl } from 'src/locals';
import { formatNetworFeeValue } from 'src/utils/format';
import { isLessOrEqualThan, minus } from 'src/utils/numberUtils';

import IconRightOutlined from '../Icons/RightOutlined';

export default function GasDetailsInTable({
  net_fee_estimated,
  net_fee_used,
  children,
}: {
  net_fee_estimated: string;
  net_fee_used: string;
  children?: React.ReactNode;
}) {
  const intl = useIntl();
  if (!Number(net_fee_estimated)) return children as any;
  const used = formatNetworFeeValue(net_fee_used);
  const estimated = formatNetworFeeValue(net_fee_estimated);
  let refund = formatNetworFeeValue(minus(estimated, used));
  if (isLessOrEqualThan(refund, 0)) {
    refund = '0';
  }
  return (
    <Tooltip
      position="right"
      label={
        <StyledGasDetails className="gas-details">
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
              <Tooltip label={intl.gas_refund_tips}>
                <div className="refend">${refund || '--'}</div>
              </Tooltip>
            </div>
          </div>
        </StyledGasDetails>
      }
    >
      <StyledGas>
        ${used}
        <IconRightOutlined size={12} />
      </StyledGas>
    </Tooltip>
  );
}

const StyledGas = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledGasDetails = styled.div`
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
    gap: 10px;
    min-width: 190px;
    .label {
      ${(props) => props.theme.fontRegular};
      font-size: 13px;
      color: ${(props) => props.theme.t_b7b};
      line-height: 20px;
    }
    .value {
      margin-left: auto;
      ${(props) => props.theme.fontRegular};
      font-size: 13px;
      color: ${(props) => props.theme.t_b7b};
      line-height: 20px;
    }
  }
`;
