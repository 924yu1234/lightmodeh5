import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useCustomNavigate, { isPage } from 'src/hooks/useCustomNavigate';

import { getUrlPath } from 'js/hooks/choosePair';
import { useWalletWeb3 } from 'js/providers/useWallet';
import { checkSwapPair } from 'js/state/swap/pairs/service';

import { useAllStocksPairs } from '../pairs/hooks';
import { resetSwapTrade } from '../trade/reducer';
import { useCurrentSwapPair, useSelectSwapPair } from './hooks';
import SwapPairUpdaterTicker from './updaterTicker';

export default function SwapPairUpdater({ page = '' }) {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const location = useLocation();

  const pairs = useAllStocksPairs();
  const choosePair = useSelectSwapPair();
  const { account } = useWalletWeb3();

  const pair = useCurrentSwapPair();
  const { baseToken, quoteToken, baseTokenId, pairId } = pair;

  useEffect(() => {
    if (pairs?.length > 0 && !pairId) {
      choosePair(pairs[0], 'swap');
    }
  }, [choosePair, dispatch, pairs, pairId]);

  // check pairId
  useEffect(() => {
    if (pairId) {
      checkSwapPair({ pairId })
        .then((resp) => {
          if (
            resp.pairId === 0 ||
            (resp.pairId === pairId && resp.baseToken?.id !== baseTokenId)
          ) {
            choosePair({});
          }
        })
        .catch(() => {
          choosePair({});
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { chain: searchChain, ...rest } =
    queryString.parse(location.search) ?? {};

  const path = useMemo(() => {
    if (!baseToken?.code || !quoteToken?.symbol) return '/swap';
    let search = location?.search || '';
    search = queryString.stringify({
      ...rest,
      chain: baseToken?.chain?.toLowerCase(),
    });

    return `${getUrlPath({
      baseToken: { code: baseToken?.code },
      quoteToken: { symbol: quoteToken?.symbol },
      page,
    })}${search ? `?${search}` : ''}`;
  }, [
    page,
    baseToken?.code,
    baseToken?.chain,
    rest,
    quoteToken?.symbol,
    location,
  ]);

  useEffect(() => {
    const isShortPath =
      isPage(location?.pathname, `/${page}`) ||
      isPage(location?.pathname, `/${page}/`) ||
      isPage(location?.pathname, '/');
    if (isShortPath || !searchChain || !path.includes('chain')) {
      navigate(path, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, navigate, searchChain]);

  useEffect(() => {
    dispatch(resetSwapTrade());
  }, [pairId, account, dispatch]);

  return (
    <>
      <SwapPairUpdaterTicker />
    </>
  );
}

SwapPairUpdater.propTypes = {
  page: PropTypes.string,
};
