import { EVMSupportedType_DAChains, Type_DAChains } from 'src/da';

import { isNumber } from './digit';

export function isAddress(value = ''): boolean | string {
  try {
    if (/^(0x)?[0-9a-fA-F]{40}$/.test(value)) return value?.toLowerCase();
  } catch {
    return false;
  }
  return false;
}

function isSolanaAddress(address: string): boolean {
  // Solana 地址是 44 个字符长的 Base58 编码字符串
  return /^[1-9A-HJ-NP-Za-km-z]{43,44}$/.test(address);
}

function isAptosAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{64}$/.test(address);
}

export function isAddressValid(
  chainId: Type_DAChains | 'ETH' | 'DEGATE',
  value: string,
  addressRegex?: string
): boolean {
  if (!chainId) return true;

  if (addressRegex) {
    return new RegExp(addressRegex).test(value);
  }
  if (
    EVMSupportedType_DAChains.includes(chainId) ||
    isNumber(chainId) ||
    chainId === 'ETH' ||
    chainId === 'DEGATE'
  ) {
    return isAddress(value) !== false;
  }
  if (chainId === 'SOLANA') {
    return isSolanaAddress(value);
  }
  if (chainId === 'APTOS') {
    return isAptosAddress(value);
  }
  return true;
}
