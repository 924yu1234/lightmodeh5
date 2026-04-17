import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { Input, PillTabs, Tabs } from 'src/UI';

import IconSearch from 'src/components/Icons/serch';
import { Type_DAChains } from 'src/da';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useCheckGetEarnDetail } from 'src/state/intent/earn/hooks';
import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';
import {
  useChangeFlag,
  useSort,
  useUpdateSort,
  useUserFlag,
} from 'src/state/user/hooks';

import useAssetsData from 'js/hooks/useAssets';
import { useIntl } from 'js/locals';

import EarnList from './earn';
import { StyledAccountAsset } from './style';
import ManageMenu from './tokens/manageMenu';
import SearchTips from './tokens/searchTips';
import Table from './tokens/table';
import Top from './top';

export default function DexBalance() {
  const intl = useIntl();
  const searchRef = useRef<HTMLInputElement>();
  const [search, setSearch] = useState('');
  const [chain, setChain] = useState<Type_DAChains | 'all'>('all');
  const { account } = useDexAccount();
  const hideSmallbalances = useUserFlag(`hide_small_balances_${account}`);
  const updateFlag = useChangeFlag(`hide_small_balances_${account}`);
  const { orderBy, orderDir } = useSort('asset_balances');
  const updateSort = useUpdateSort('asset_balances');
  const [tab, setTab] = useState<'tokens' | 'earn'>('tokens');
  const showModal = useShowModal();
  useCheckGetEarnDetail();
  const refreshSwapBalance = useRefreshSwapBalance();

  const { loading, data } = useAssetsData({
    search,
    hideSmallbalances,
    orderBy,
    orderDir,
    chain,
  });

  useEffect(() => {
    if (!isMobile) searchRef?.current?.focus();
    refreshSwapBalance();
  }, [refreshSwapBalance]);

  return (
    <StyledAccountAsset>
      <Top />
      <div className="balance-main-tabs-wrapper">
        <div className="balance-pill-tabs-row">
          <PillTabs
            className="balance-pill-tabs"
            value={tab}
            onChange={(v) => {
              if (v === 'tokens' || v === 'earn') setTab(v);
            }}
            tabHeight={44}
          >
            <Tabs.List>
              <Tabs.Tab value="tokens">{intl.Tokens}</Tabs.Tab>
              <Tabs.Tab value="earn">{intl.Earn}</Tabs.Tab>
            </Tabs.List>
          </PillTabs>
        </div>
        <div className="balance-tab-panel">
          {tab === 'tokens' && (
            <div className="table-tpl">
              <div className="search-tpl">
                <div className="balance-search-field">
                  <Input
                    ref={searchRef as any}
                    uiVariant="homeSearch"
                    leftSection={<IconSearch />}
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                    placeholder={intl['account.assets_search_placeholder']}
                  />
                </div>
                <ManageMenu
                  chain={chain}
                  setChain={setChain}
                  hideSmallbalances={hideSmallbalances}
                  updateFlag={updateFlag}
                  onOpenManageTokens={() =>
                    showModal({ modal: ModalKeys.manageTokens })
                  }
                />
              </div>
              <Table
                dataSource={data}
                loading={loading}
                orderBy={orderBy}
                orderDir={orderDir}
                updateSort={updateSort}
              />
              {!loading && !!search && !data?.length && <SearchTips />}
            </div>
          )}
          {tab === 'earn' && <EarnList />}
        </div>
      </div>
    </StyledAccountAsset>
  );
}
