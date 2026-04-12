import { useEffect, useMemo, useState } from 'react';

import useWallet, { useIsAppH5 } from 'src/providers/useWallet';
import { useDexAccount } from 'src/state/dexAccount/hooks';

import { fetchConfigsByKeys } from 'js/state/application/service';

import { PrivateClientDeskContacts } from './types';

const CONFIG_TYPE = 'privateClientDesk';

interface ConfigItem {
  key?: string;
  walletId?: string;
  telegram?: string;
  whatsapp?: string;
  signal?: string;
  signalLink?: string;
  email?: string;
  create_time?: string;
}

interface VipContactRecord {
  walletId: string;
  contacts: PrivateClientDeskContacts;
  createTimestamp?: number;
}

function _normalizeWalletId(walletId?: string) {
  return String(walletId || '')
    .trim()
    .toLowerCase();
}

function _extractWalletIdFromDaOwner(daOwner?: string) {
  const owner = String(daOwner || '').trim();
  if (!owner) return '';
  return _normalizeWalletId(owner.split('_')?.[0]);
}

function _buildConfigKey(walletId: string) {
  return `${CONFIG_TYPE}_${_normalizeWalletId(walletId)}`;
}

function _extractWalletId(data: ConfigItem) {
  const walletId = _normalizeWalletId(data.walletId);
  if (walletId) return walletId;
  const key = String(data.key || '');
  if (!key.startsWith(`${CONFIG_TYPE}_`)) return '';
  return _normalizeWalletId(key.slice(CONFIG_TYPE.length + 1));
}

function _parseCreateTimestamp(value?: string) {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined;
  }
  const ts = Date.parse(value);
  if (Number.isNaN(ts)) return undefined;
  return ts;
}

function _uniqueWalletIds(walletIds: string[]) {
  const uniq = new Set<string>();
  return walletIds.filter((walletId) => {
    const normalized = _normalizeWalletId(walletId);
    if (!normalized || uniq.has(normalized)) return false;
    uniq.add(normalized);
    return true;
  });
}

const _contactsCache = new Map<string, PrivateClientDeskContacts>();

function _getCacheKey(walletId: string, isAppH5: boolean) {
  return `${isAppH5 ? 'app_' : ''}${walletId}`;
}

export default function usePrivateClientDeskContacts() {
  const { da_owner, account } = useDexAccount();
  const { callAppPromise } = useWallet();
  const isAppH5 = useIsAppH5();
  const [contacts, setContacts] = useState<PrivateClientDeskContacts>();

  useEffect(() => {
    const currentWalletId = _extractWalletIdFromDaOwner(da_owner);
    if (!currentWalletId) {
      setContacts(undefined);
      return () => {};
    }

    const cacheKey = _getCacheKey(currentWalletId, isAppH5);
    const cached = _contactsCache.get(cacheKey);
    if (cached) {
      setContacts(cached);
      return () => {};
    }

    let canceled = false;

    const fetchContacts = async () => {
      let appWalletIds: string[] = [];
      if (isAppH5 && callAppPromise) {
        try {
          const allWalletIds = await callAppPromise('getAllWalletId', '');
          if (Array.isArray(allWalletIds)) {
            appWalletIds = allWalletIds
              .map((id) => _normalizeWalletId(id))
              .filter(Boolean);
          }
        } catch (error) {
          appWalletIds = [];
        }
      }

      const queryWalletIds = _uniqueWalletIds([
        ...appWalletIds,
        currentWalletId,
      ]);
      const rows = await fetchConfigsByKeys(
        queryWalletIds.map((walletId) => _buildConfigKey(walletId))
      );

      if (canceled) return;

      const recordMap = rows.reduce(
        (acc: Record<string, VipContactRecord>, row: ConfigItem) => {
          const walletId = _extractWalletId(row);
          if (!walletId) return acc;

          const candidate: VipContactRecord = {
            walletId,
            contacts: {
              telegram: row.telegram || '',
              whatsapp: row.whatsapp || '',
              signal: row.signal || '',
              signalLink: row.signalLink || '',
              email: row.email || '',
            },
            createTimestamp: _parseCreateTimestamp(row.create_time),
          };

          const current = acc[walletId];
          if (!current) {
            acc[walletId] = candidate;
            return acc;
          }

          const currentTimestamp =
            current.createTimestamp ?? Number.MAX_SAFE_INTEGER;
          const candidateTimestamp =
            candidate.createTimestamp ?? Number.MAX_SAFE_INTEGER;
          if (candidateTimestamp < currentTimestamp) {
            acc[walletId] = candidate;
          }

          return acc;
        },
        {}
      );

      if (isAppH5 && appWalletIds.length) {
        const sortedRecords = appWalletIds
          .map((walletId) => recordMap[walletId])
          .filter(Boolean)
          .sort((a, b) => {
            return (
              (a.createTimestamp ?? Number.MAX_SAFE_INTEGER) -
              (b.createTimestamp ?? Number.MAX_SAFE_INTEGER)
            );
          });

        const result = sortedRecords[0]?.contacts;
        if (result) {
          _contactsCache.set(cacheKey, result);
        }
        setContacts(result);
        return;
      }

      const currentRecord = recordMap[currentWalletId];
      const result = currentRecord?.contacts;
      if (result) {
        _contactsCache.set(cacheKey, result);
      }
      setContacts(result);
    };

    fetchContacts().catch(() => {
      if (!canceled) {
        setContacts(undefined);
      }
    });

    return () => {
      canceled = true;
    };
  }, [account, callAppPromise, da_owner, isAppH5]);

  return useMemo(() => {
    return {
      ...contacts,
      hasConfig: Boolean(
        contacts?.telegram ||
          contacts?.whatsapp ||
          contacts?.signal ||
          contacts?.email
      ),
    };
  }, [contacts]);
}
