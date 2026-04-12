import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Type_EARN_PROTOCOLS } from 'src/da';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useRefreshSwapBalanceIndex } from 'src/hooks/useRefreshData/useRefreshSwapBalance';
import { AppState } from 'src/state';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { logEarn } from 'src/utils/log/swap';

import {
  useRefreshVaultsIndex,
  useSetIntentEarnDetail,
  useSetIntentEarnState,
  useUpdateFetchingDetailSuccess,
  useVaults,
} from './hooks';
import { getIntentEarnDetail, getIntentEarnList } from './service';
// import { getIntentEarnList } from './intentEarnService';

export default function IntentEarnUpdater() {
  const dispatch = useDispatch();
  const setIntentEarnState = useSetIntentEarnState();
  const vaults = useVaults(true);
  const { DAs } = useDexAccount();
  const refreshIndex = useRefreshVaultsIndex();
  const setIntentEarnDetail = useSetIntentEarnDetail();
  const loadingDetail = useSelector(
    (state: AppState) => state.intentEarn.loadingDetail
  );
  const refreshSwapBalanceIndex = useRefreshSwapBalanceIndex();
  const updateFetchingDetailSuccess = useUpdateFetchingDetailSuccess();
  const refreshApyIndex = useRefresh(15000);
  useEffect(() => {
    getIntentEarnList().then((vaults) => {
      setIntentEarnState({ vaults });
      setIntentEarnState({
        loadingDetail: {
          Morpho: Math.ceil(Date.now() / 1000),
          Kamino: Math.ceil(Date.now() / 1000),
        },
      });
    });
  }, [dispatch, setIntentEarnState]);

  const valutAddress = useMemo(() => {
    return vaults?.map((vault) => {
      return {
        protocol: vault.protocol,
        chain: vault.chain,
        address: vault.address,
      };
    });
  }, [vaults]);

  const jsonString = JSON.stringify(valutAddress);

  const DAsString = JSON.stringify(DAs);

  useEffect(() => {
    const _valuts = JSON.parse(jsonString);
    if (!_valuts?.length) return;
    getIntentEarnDetail({
      options: _valuts.map((vault: any) => {
        return {
          type: vault.protocol,
          chain: vault.chain,
          vaults: [vault.address],
        };
      }),
      cacheTime: 1000,
    }).then((res) => {
      const resp = res.reduce((res: any, item: any) => {
        const _key = `${item.vaultAddress}`;
        res[_key] = item;
        return res;
      }, {});
      setIntentEarnState({
        vaultsDetailWithoutAddress: resp,
      });
    });
  }, [jsonString, setIntentEarnState, refreshApyIndex]);

  useEffect(() => {
    setIntentEarnState({
      vaultsDetail: {},
    });
  }, [DAsString, setIntentEarnState]);

  const isFetchingRef = useRef({});

  const fetchDetail = useCallback(
    (protocol?: Type_EARN_PROTOCOLS) => {
      const walletAddress: any = {};
      const _valuts = JSON.parse(jsonString);
      if (!DAsString) return () => {};
      const options = _valuts.reduce((res: any, vault: any) => {
        const chain = vault.chain;
        if (!protocol || vault.protocol === protocol) {
          const key = `${vault.protocol}_${chain}`;
          let pre = res[key];
          if (DAs?.[chain] && DAs?.[chain].address) {
            walletAddress[chain] = DAs[chain].address;
          }
          if (!pre) {
            pre = {
              type: vault.protocol,
              chain: vault.chain,
              vaults: [vault.address],
            };
          } else {
            pre.vaults.push(vault.address);
          }
          res[key] = pre;
        }
        return res;
      }, {});
      let isCurrentRequest = true;

      Promise.all(
        Object.values(options).map((option: any) => {
          const daAddress = walletAddress[option.chain];
          const key = `${option.type}_${daAddress}_${option.chain}`;
          if ((isFetchingRef.current as any)[key]) {
            return Promise.resolve({});
          }
          (isFetchingRef.current as any)[key] = true;
          if (daAddress) {
            logEarn({
              event: 'fetchIntentEarnDetailStart',
              daAddress,
              key,
            });
          }
          return getIntentEarnDetail({
            options: [option],
            walletAddress,
          })
            .then((res) => {
              (isFetchingRef.current as any)[key] = false;
              if (!isCurrentRequest) return;
              const resp = res.reduce((res: any, item: any) => {
                const _key = `${item.vaultAddress}`;
                res[_key] = { ...item, daAddress };
                return res;
              }, {});
              setIntentEarnDetail(resp, option.type);
              if (daAddress) {
                logEarn({
                  event: 'fetchIntentEarnDetailSuccess',
                  daAddress,
                  key,
                  res: (res || []).map((item: any) => {
                    return {
                      vaultAddress: item.vaultAddress,
                      myDepositUsd: item.myDepositUsd,
                    };
                  }),
                });
              }
              // eslint-disable-next-line consistent-return
              return resp;
            })
            .catch((error) => {
              (isFetchingRef.current as any)[key] = false;
              logEarn({
                event: 'fetchIntentEarnDetailError',
                key,
                error,
              });
              return {};
            });
        })
      ).finally(() => {
        if (protocol) {
          updateFetchingDetailSuccess(protocol);
        }
        isCurrentRequest = false;
      });

      return () => {
        isCurrentRequest = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [DAsString, jsonString]
  );

  useEffect(() => {
    const _valuts = JSON.parse(jsonString);
    if (refreshIndex === 0) return;
    if (!_valuts?.length) return;
    setIntentEarnState({
      showLoading: !!DAsString,
    });
    if (!DAsString) return;
    setIntentEarnState({
      loadingDetail: {
        Morpho: Math.ceil(Date.now() / 1000),
        Kamino: Math.ceil(Date.now() / 1000),
      },
    });
  }, [DAsString, jsonString, refreshIndex, setIntentEarnState]);

  useEffect(() => {
    if (loadingDetail.Morpho) {
      fetchDetail('Morpho');
    }
  }, [fetchDetail, loadingDetail.Morpho]);

  useEffect(() => {
    if (loadingDetail.Kamino) {
      fetchDetail('Kamino');
    }
  }, [fetchDetail, loadingDetail.Kamino]);

  useEffect(() => {
    if (window.hasEarnDepositOrder) {
      fetchDetail();
    }
  }, [fetchDetail, refreshSwapBalanceIndex]);

  return null;
}
