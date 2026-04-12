import React from 'react';
import styled from 'styled-components';

import { useTimeStr_DdayHhourMminuteSsecond } from 'src/hooks/useTimeStr';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import EstNetworkFee from '../EstNetworkFee';
import { useBridgeUsdcData } from './dataProvider';

export default function Info() {
  const intl = useIntl();
  const { tryResp, doTry } = useBridgeUsdcData();
  const estimateTime = tryResp?.estimate_time || 0;
  const getTimeStr = useTimeStr_DdayHhourMminuteSsecond();
  return (
    <StyledInfo>
      {estimateTime > 0 && (
        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-item-title">{intl.est_time}</div>
          <div className="info-item-value">
            {intl.around}
            {getTimeStr(estimateTime)}
          </div>
        </div>
      )}
      <div className="info-item">
        <div className="info-item-title">{intl.est_network_fee}</div>
        <div className="info-item-value">
          <EstNetworkFee tryResp={tryResp} onSelectPayGasToken={doTry} />
        </div>
      </div>
    </StyledInfo>
  );
}

const StyledInfo = styled.div`
  margin-top: auto;
  .info-item {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info-item-title {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .info-item-value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }
`;
