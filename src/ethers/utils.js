import { useCallback } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
  formatUnits as eFormatUnits,
  parseUnits as eParseUnits,
} from '@ethersproject/units';
import { toUpper } from 'lodash';
import urlJoin from 'url-join';

import { UserCancel } from 'src/providers/useWallet';
import { useChainInfosMap } from 'src/state/application/hooks';

import { networks } from 'js/constants/ethers';
import { logger } from 'js/utils/logger';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ETH_CODE = '0x0000000000000000000000000000000000000000';

const inputRegex = /^(0x[a-fA-F0-9]{40})$/;

export const validateAddres = (address) => {
  return inputRegex.test(address);
};
export const isZeroAddress = (address) => {
  return address && address.toLowerCase() === ZERO_ADDRESS;
};

// for loop

export const isEth = ({ code } = {}) => {
  const upperCase = toUpper(code ?? '');
  return upperCase === toUpper(ETH_CODE) || upperCase === 'ETH';
};

export const isStableQuote = ({ symbol } = {}) => {
  const upperCase = toUpper(symbol ?? '');
  return (
    upperCase === 'USDC' ||
    upperCase === 'USDT' ||
    upperCase === 'USDM' ||
    upperCase === 'LUSD'
  );
};

export const isUnStableQuote = ({ symbol } = {}) => {
  const upperCase = toUpper(symbol ?? '');
  return upperCase === 'ETH' || upperCase === 'WBTC';
};

export const getTotalMaxDecimals = ({ symbol } = {}) => {
  const upperCase = toUpper(symbol ?? '');
  if (upperCase === 'ETH') return 5;
  if (upperCase === 'WBTC') return 6;
  return 2;
};

export const getUrlCode = (code) => {
  if (!code) return '';
  if (isEth({ code })) return 'ETH';
  return code.toLowerCase();
};

const providers = {};

export const getProvider = ({ chainId }) => {
  const rpc = networks[chainId]?.rpc;
  if (!rpc) return null;
  if (!providers[rpc]) {
    providers[rpc] = new JsonRpcProvider(rpc);
  }
  return providers[rpc];
};

export function useGetBrowserUrl() {
  const chainInfoMap = useChainInfosMap();
  return useCallback(
    ({ chainId, tx_hash, address, code }) => {
      if (chainId === undefined) return '';
      const url = chainInfoMap[chainId]?.explorer;
      const map = chainInfoMap[chainId]?.explorerUrlMap;
      let result = '';
      if (url) {
        if (tx_hash) {
          if (map?.txHash) {
            result = urlJoin(url, map.txHash.replace('{{txHash}}', tx_hash));
          } else {
            result = urlJoin(url, `tx/${tx_hash}`);
          }
        }
        if (address) {
          if (map?.address) {
            result = urlJoin(url, map.address.replace('{{address}}', address));
          } else {
            result = urlJoin(url, `address/${address}`);
          }
        }
        if (code) {
          if (map?.token) {
            result = urlJoin(url, map.token.replace('{{token}}', code));
          } else {
            result = urlJoin(url, `token/${code}`);
          }
        }
      }
      return result;
    },
    [chainInfoMap]
  );
}

export const isWalletModalCancel = (err) => {
  return err?.code === UserCancel;
};

export const isUserCancel = (err) => {
  if (typeof err === 'string') {
    return err?.includes('cancel');
  }
  if (err?.message && err?.message.includes('User denied message signature.')) {
    return true;
  }

  if (err?.message && err?.message.includes('user rejected')) {
    return true;
  }

  // wc2.0
  if (
    err?.message &&
    err?.message.includes('Connection request reset. Please try again.')
  ) {
    return true;
  }

  // tp wc2.0
  if (err?.message && err?.message.includes('Cancelled')) {
    return true;
  }

  if (err?.message && err?.message.includes('wallet is in another signing')) {
    return false;
  }

  return (
    err?.code === 4001 ||
    err?.statusCode === 27013 ||
    err?.code === -32000 ||
    err?.code === 'ACTION_REJECTED'
  );
};

export const LedgerLockedCode = 40001001;

export const isLedgerLocked = (err) => {
  if (err?.message && err?.message.includes('Ledger device is locked')) {
    return true;
  }
  if (err?.message && err?.message.includes('Ledger device: Locked device')) {
    return true;
  }
  if (err?.code === LedgerLockedCode) return true;
  return false;
};

export const isLedgerAccountNotMatch = (err) => {
  if (err?.message && err?.message.includes('account not match')) {
    return true;
  }
  return false;
};

export const isLedgerDisconnect = (err) => {
  if (err?.message && err?.message.includes('The device was disconnected.')) {
    return true;
  }
  if (err?.name && err?.name.includes('DisconnectedDeviceDuringOperation')) {
    return true;
  }
  return false;
};

export const isLedgerConnectedAnotherTab = (err) => {
  if (
    err?.message &&
    err?.message.includes(
      "Failed to execute 'claimInterface' on 'USBDevice': Unable to claim interface."
    )
  ) {
    return true;
  }
  return false;
};

export const isCodeEqual = (code1, code2) => {
  if (!code1 || !code2) return false;
  return code1?.toLowerCase() === code2?.toLowerCase();
};

export function formatEther(wei) {
  return formatUnits(wei, 18);
}

export const formatUnits = (num, decimals) => {
  if (decimals === undefined) {
    logger.error('no decimals');
  }
  if (num === '0') return '0';
  const formatted = eFormatUnits(num, decimals);
  // 移除小数点后的零
  return formatted.replace(/\.0+$/, '');
};

export const parseUnits = (num, decimals) => {
  if (decimals === undefined) {
    logger.error('no decimals');
  }
  try {
    return eParseUnits(num, decimals);
  } catch (error) {
    return '';
  }
};
