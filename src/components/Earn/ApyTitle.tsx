import React from 'react';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import { Vault } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { useIsFetchingDetails } from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import IconInfo from '../Icons/info';

export default function ApyTitle({ vault }: { vault: Vault }) {
  const vaultDetail = vault?.detail ?? {};
  const apy = vaultDetail.totalApy;
  const dailyApys = vaultDetail?.dailyApys || {};
  const isFetchingDetail = useIsFetchingDetails();
  const intl = useIntl();

  const hideDetail = isFetchingDetail || vault.protocol === 'Morpho';

  return (
    <StyledSpan onClick={(e) => e.stopPropagation()}>
      <Tooltip
        events={{
          hover: true,
          touch: true,
          focus: true,
        }}
        disabled={hideDetail}
        withinPortal={false}
        label={
          <StyledApy>
            <div className="item-title">{intl.native_Apy}</div>
            <div className="item-vaule">
              {digit.format(dailyApys.apy, '0.00%')}
            </div>
            {(dailyApys?.rewardApy || [])
              .filter((d: any) => d.supplyApr > 0)
              .map((d: any) => {
                return (
                  <>
                    <div className="item-title">{d.asset.symbol}</div>
                    <div className="item-vaule">
                      {digit.format(d.supplyApr, '0.00%')}
                    </div>
                  </>
                );
              })}
            {!!dailyApys?.fee && (
              <>
                <div className="item-title total-apy">
                  {intl.performance_fee}({digit.format(dailyApys?.fee, '0.00%')}
                  )
                </div>
                <div className="item-vaule total-apy">
                  {digit.format(vaultDetail?.feeApy, '0.00%')}
                </div>
              </>
            )}
            <div className="item-title total-apy">{intl.Total_APY}</div>
            <div className="item-vaule total-apy">
              {digit.format(apy, '0.00%')}
            </div>
          </StyledApy>
        }
        position="bottom"
      >
        <div className="apy-text">
          {intl.APY}
          <div className="info-wrapper">{!hideDetail && <IconInfo />}</div>
        </div>
      </Tooltip>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  .apy-text {
    display: flex;
    align-items: center;
    gap: 4px;
    .info-wrapper {
      width: 12px;
      height: 12px;
      display: flex;
      align-items: center;
    }
  }
`;

const StyledApy = styled.div`
  display: grid;
  gap: 5px 10px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .item-title {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .item-vaule {
    margin-left: auto;
    text-align: right;
  }
  &.total-apy {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
  }
`;
