import { useCallback, useMemo } from 'react';
import { orderBy as orderByFn } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { Vault } from 'src/constants/interface';
import { Type_EARN_PROTOCOLS } from 'src/da';
import { formatUnits } from 'src/ethers/utils';
import { useInfo } from 'src/state/application/hooks';
import { isNumber } from 'src/utils/digit';
import { plus } from 'src/utils/numberUtils';

import { AppState } from '../..';
import {
  refreshIntentEarnState,
  updateFetchingDetail,
  updateFetchingDetailSuccess,
  updateIntentEarnDetail,
  updateIntentEarnState,
} from './reducer';

export function useIntentEarnState() {
  return useSelector((state: AppState) => state.intentEarn);
}

export function useSetIntentEarnState() {
  const dispatch = useDispatch();
  return useCallback(
    (params: any) => {
      dispatch(updateIntentEarnState(params));
    },
    [dispatch]
  );
}

export function useSetIntentEarnDetail() {
  const dispatch = useDispatch();
  return useCallback(
    (details: any, protocol: Type_EARN_PROTOCOLS) => {
      dispatch(updateIntentEarnDetail({ details, protocol } as any));
    },
    [dispatch]
  );
}

export function useVaults(all?: boolean) {
  const vaults = useSelector((state: AppState) => state.intentEarn.vaults);
  const { simpleEarnDisabledDAs } = useInfo();
  const vaultDetail = useSelector(
    (state: AppState) => state.intentEarn.vaultsDetail
  );
  const vaultsDetailWithoutAddress = useSelector(
    (state: AppState) => state.intentEarn.vaultsDetailWithoutAddress
  );
  return useMemo(() => {
    return vaults
      .filter(
        (vault) =>
          all ||
          !simpleEarnDisabledDAs ||
          !simpleEarnDisabledDAs.includes(vault.address)
      )
      .map((vault) => {
        const key = `${vault.address}`;
        const _detailWithoutAddress = vaultsDetailWithoutAddress[key] || {};
        const detail = vaultDetail[key] || {};

        const dailyApys =
          _detailWithoutAddress?.dailyApys || detail?.dailyApys || {};
        const fee = dailyApys?.fee || 0;
        let feeApy = 0;
        if (fee) {
          feeApy = dailyApys.apy * fee;
        }

        return {
          detail: {
            ..._detailWithoutAddress,
            ...detail,
            dailyApys,
            totalApy: dailyApys.netApy,
            feeApy,
          },
          apy: dailyApys?.netApy,
          ...vault,
        };
      });
  }, [
    vaults,
    vaultDetail,
    simpleEarnDisabledDAs,
    all,
    vaultsDetailWithoutAddress,
  ]);
}

// apy tvl loading
export function useIsFetchingDetails(vaultAddress?: string) {
  const vaultsDetailWithoutAddress = useSelector(
    (state: AppState) => state.intentEarn.vaultsDetailWithoutAddress
  );
  const res = useMemo(() => {
    if (!vaultAddress)
      return Object.values(vaultsDetailWithoutAddress)?.length === 0;
    return !vaultsDetailWithoutAddress[vaultAddress];
  }, [vaultsDetailWithoutAddress, vaultAddress]);
  return res;
}

export function useIsFetchingUserDetails(vaultProtocol?: Type_EARN_PROTOCOLS) {
  const vaults = useVaults(true);
  const vaultDetails = useSelector(
    (state: AppState) => state.intentEarn.vaultsDetail
  );
  const loadingAllUserDetails = useIsFetchingAllUserDetails();

  const res = useMemo(() => {
    if (!vaults?.length) return true;
    if (!vaultProtocol) {
      return loadingAllUserDetails;
    }
    return vaults
      .filter((v) => v.protocol === vaultProtocol)
      .some(
        (v) => !vaultDetails[v.address] || !vaultDetails[v.address]?.daAddress
      );
  }, [vaultProtocol, vaults, vaultDetails, loadingAllUserDetails]);
  return res;
}

export function useIsFetchingAllUserDetails() {
  const vaults = useVaults(true);
  const vaultDetails = useSelector(
    (state: AppState) => state.intentEarn.vaultsDetail
  );

  const res = useMemo(() => {
    if (!vaults?.length) return true;
    return vaults.some(
      (vault) =>
        !vaultDetails[vault.address] || !vaultDetails[vault.address]?.daAddress
    );
  }, [vaults, vaultDetails]);
  return res;
}

export function useUpdateVaultDetail() {
  const dispatch = useDispatch();
  return useCallback(
    (vaultProtocol: Type_EARN_PROTOCOLS) => {
      dispatch(updateFetchingDetail({ protocol: vaultProtocol } as any));
    },
    [dispatch]
  );
}

// 是否拿到用户单个vault的detail
export function useIsFetchingVaultDetail(vault: Vault) {
  const detail = useVaultDetail(vault);
  return !detail.orderAddress;
}

export function useUpdateFetchingDetailSuccess() {
  const dispatch = useDispatch();
  return useCallback(
    (vaultProtocol: Type_EARN_PROTOCOLS) => {
      dispatch(updateFetchingDetailSuccess({ protocol: vaultProtocol } as any));
    },
    [dispatch]
  );
}

export function useVault(id: number) {
  const vaults = useVaults(true);
  return useMemo(() => {
    return vaults.find((vault) => vault.id === id) || {};
  }, [vaults, id]);
}

export function useVaultDetail(valut: Vault) {
  const key = `${valut?.address}`;
  const vaultsDetail = useSelector(
    (state: AppState) => state.intentEarn.vaultsDetail
  );
  return useMemo(() => {
    return vaultsDetail[key] || {};
  }, [vaultsDetail, key]);
}

export function useMyVaults() {
  const valuts = useVaults(true);
  return useMemo(() => {
    return valuts.filter((vault) => vault.detail?.myDepositAmount > 0);
  }, [valuts]);
}

export function useMyVaultsSorted() {
  const valuts = useVaults(true);
  return useMemo(() => {
    return orderByFn(
      valuts.filter((vault) => vault.detail?.myDepositAmount > 0),
      (d) => Number(d.detail?.myDepositUsd),
      'desc'
    );
  }, [valuts]);
}

export function useTotalDepositUsd(): number {
  const valuts = useMyVaults();
  return useMemo(() => {
    return valuts.reduce((res: number, vault) => {
      const detail = vault.detail || {};
      return res + Number(detail.myDepositUsd || 0);
    }, 0);
  }, [valuts]);
}

export function useVaultsHasRewards() {
  const valuts = useVaults(true);
  return useMemo(() => {
    return valuts.filter((vault) => vault.detail?.rewards?.length > 0);
  }, [valuts]);
}

// morpho 奖励通用
export function useMorphoRewards() {
  const valuts = useVaultsHasRewards();
  return useMemo(() => {
    const rewardsMap = valuts.reduce((re, vault) => {
      if (vault.protocol !== 'Morpho') {
        return re;
      }
      (vault?.detail?.rewards || []).forEach((d: any) => {
        const pre = re[d.token + d.chain];
        if (!pre) {
          re = {
            ...re,
            [d.token]: {
              ...d,
              chain: vault.chain,
              vault,
            },
          };
        } else {
          re = {
            ...re,
            [d.token + d.chain]: {
              ...pre,
              claimable: plus(d.claimable, pre.claimable),
              claimableNext: plus(d.claimableNext, pre.claimableNext),
            },
          };
        }
      });
      return re;
    }, {});
    return Object.values(rewardsMap).map((item: any) => {
      const claimable = item.claimable;
      const accruing = item.claimableNext;
      const claimableAmount = isNumber(claimable)
        ? formatUnits(claimable, item.decimals)
        : '0';
      const accruingAmount = isNumber(accruing)
        ? formatUnits(accruing, item.decimals)
        : '0';
      const claimableUsd = Number(claimableAmount) * Number(item.priceUsd);
      const accruingUsd = Number(accruingAmount) * Number(item.priceUsd);
      return {
        ...item,
        token: {
          icon: item.logoURI,
          code: item.token,
          symbol: item.symbol,
          chain: item.chain,
        },
        claimable,
        accruing,
        claimableAmount,
        accruingAmount,
        claimableUsd,
        accruingUsd,
      };
    });
  }, [valuts]);
}

export function useKaminoRewards() {
  const valuts = useVaultsHasRewards();
  return useMemo(() => {
    return valuts
      .filter((vault) => vault.protocol === 'Kamino')
      .reduce((re, vault) => {
        return re.concat(
          (vault?.detail?.rewards || []).map((d: any) => ({
            ...d,
            chain: vault.chain,
            vault,
          }))
        );
      }, [])
      .map((item: any) => {
        const claimable = item.claimable;
        const claimableAmount = isNumber(claimable)
          ? formatUnits(claimable, item.decimals)
          : '0';
        const claimableUsd = Number(claimableAmount) * Number(item.priceUsd);
        return {
          ...item,
          token: {
            icon: item.logoURI,
            code: item.token,
            symbol: item.symbol,
            chain: item.chain,
          },
          claimableAmount,
          claimableUsd,
        };
      });
  }, [valuts]);
}

export function useRefreshVaults() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(refreshIntentEarnState());
  }, [dispatch]);
}

export function useRefreshVaultsIndex() {
  return useSelector((state: AppState) => state.intentEarn.refreshIndex);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useIsGasFree(protocol: string) {
  return false;
}

export function useCheckGetEarnDetail() {
  const index = useRefreshVaultsIndex();
  const refresh = useRefreshVaults();
  return useMemo(() => {
    if (index === 0) {
      refresh();
    }
  }, [index, refresh]);
}
