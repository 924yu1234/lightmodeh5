import React, { useCallback, useRef, useState } from 'react';

import { Input } from 'src/UI';

import IconFilter from 'src/components/Icons/filter';
import IconSearch from 'src/components/Icons/serch';
import { Type_DAChains } from 'src/da';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useCheckGetEarnDetail } from 'src/state/intent/earn/hooks';
import { useUserFlag } from 'src/state/user/hooks';

import useAssetsData from 'js/hooks/useAssets';
import { useIntl } from 'js/locals';

import Table from './tokens/list';
import SearchTips from './tokens/searchTips';

export default function DexBalance() {
  useCheckGetEarnDetail();
  const intl = useIntl();
  const searchRef = useRef<HTMLInputElement>();
  const [search, setSearch] = useState('');
  const [chain, setChain] = useState<Type_DAChains | 'all'>('all');
  const hideSmallbalances = useUserFlag('hide_small_balances');
  const showModal = useShowModal();
  const openMenu = useCallback(() => {
    showModal({ modal: ModalKeys.balanceManageMenu, chain, setChain });
  }, [chain, setChain, showModal]);

  const { loading, data } = useAssetsData({
    search,
    chain,
    hideSmallbalances,
    orderBy: 'totalValue',
    orderDir: 'desc',
  });

  return (
    <div className="table-tpl">
      <div className="search-tpl">
        <Input
          ref={searchRef as any}
          leftSection={<IconSearch />}
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder={intl['account.search_tokens']}
        />
        <div className="manage-entry" onClick={openMenu}>
          <IconFilter />
        </div>
      </div>
      <Table data={data} loading={loading} />
      {!loading && !!search && !data?.length && <SearchTips />}
    </div>
  );
}
