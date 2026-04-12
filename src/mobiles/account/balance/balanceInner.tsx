import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ExcessiveBalanceTipsEntry from 'src/components/ExcessiveBalanceTips';
import BannerMessage from 'src/components/ServerMessages/banner';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import TotalAsset from 'src/mobiles/components/totalAsset';
import { useCheckGetEarnDetail } from 'src/state/intent/earn/hooks';
import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';

import { useIntl } from 'js/locals';

import DexBalance from './dexBalance';
import EarnList from './earn';
import AssetsOprs from './oprs';
import { StyledAccountAsset } from './style';
import BalanceTop from './top';

export default function DexBalanceInner() {
  useCheckGetEarnDetail();
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const refreshSwapBalance = useRefreshSwapBalance();

  useEffect(() => {
    refreshSwapBalance();
  }, [refreshSwapBalance]);

  const { tab = 'tokens' } = useParams();

  return (
    <StyledAccountAsset>
      <BalanceTop />
      <div className="page-inner" id="mobileBalanceTpl">
        <TotalAsset />
        <ExcessiveBalanceTipsEntry />
        <BannerMessage />
        <AssetsOprs />

        <div className="balance-tabs">
          <div
            className={`balance-tab ${tab === 'tokens' ? 'active' : ''}`}
            onClick={() =>
              navigate(`/account/balance/tokens`, { replace: true })
            }
          >
            <div className="active-bar" />
            <div className="balance-tab-title">{intl.Tokens}</div>
          </div>
          <div
            className={`balance-tab ${tab === 'earn' ? 'active' : ''}`}
            onClick={() => navigate(`/account/balance/earn`, { replace: true })}
          >
            <div className="active-bar" />
            <div className="balance-tab-title">{intl.Earn}</div>
          </div>
        </div>
        {tab === 'tokens' && <DexBalance />}
        {tab === 'earn' && <EarnList />}
      </div>
    </StyledAccountAsset>
  );
}
