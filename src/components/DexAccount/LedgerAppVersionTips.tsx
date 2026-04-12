import React from 'react';
import styled from 'styled-components';

import { useIsLedger, useLedgerAppVersion } from 'js/hooks/useWalletHooks';
import { useIntl } from 'js/locals';
import { ThemeType } from 'js/theme';
import { compareVersions } from 'js/utils/numberUtils';
// 1.9.19 personal_sign
// 1.10.0 eip712 sign,  nanoS can't display eip-712
export default function LedgerAppVersionTips({
  version = '1.9.19',
}: {
  version?: '1.9.19' | '1.10.0';
}) {
  const intl = useIntl();
  const isLedger = useIsLedger();
  const appVersion = useLedgerAppVersion();
  const showTips = compareVersions(appVersion, version) < 0;
  if (!isLedger || !showTips || !appVersion) return null;
  return <StyledTips>{intl.ledger_app_version_tips}</StyledTips>;
}

const StyledTips = styled.div`
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
  border-radius: 20px 20px 0px 0px;
  padding: 10px 20px;
  line-height: 20px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 12px;
  color: ${({ theme }: { theme: ThemeType }) => theme.blue};
`;
