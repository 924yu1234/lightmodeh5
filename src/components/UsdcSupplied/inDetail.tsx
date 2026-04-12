import React from 'react';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import ChainIcon from 'src/components/ChainIcon';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

import IconRightOutlined from '../Icons/RightOutlined';

export default function UsdcSuppliedInDetailModal({
  tokens,
}: {
  tokens: any[];
}) {
  const intl = useIntl();
  const chainInfosMap = useChainInfosMap();

  if (!tokens?.length) return null;
  return (
    <StyledSupplied className="usdc-supplied">
      <Tooltip
        events={{
          hover: true,
          touch: true,
          focus: true,
        }}
        label={
          <StyledAvi>
            {intl.Chain_Details}
            {tokens.map((d) => {
              const chain = d.chain as Type_DAChains;
              return (
                <div key={d.chain} className="supplied-item">
                  <div className="supplied-chain">
                    <ChainIcon chain={chain} />
                    {chainInfosMap[chain]?.name}
                  </div>
                  <div className="supplied-amount">{d.amount_display}</div>
                </div>
              );
            })}
          </StyledAvi>
        }
        position="bottom"
      >
        <div className="supplied-text">
          {intl.Details}
          <IconRightOutlined size={12} />
        </div>
      </Tooltip>
    </StyledSupplied>
  );
}

const StyledAvi = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;

  .supplied-item {
    min-width: 170px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 13px;
    line-height: 20px;
    .supplied-chain {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 110px;
    }
    .supplied-amount {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      margin-left: 10px;
    }
  }
`;

const StyledSupplied = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  margin-top: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .supplied-text {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
