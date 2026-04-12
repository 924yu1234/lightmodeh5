import { useMemo } from 'react';

import { useIsAppH5, useWalletWeb3 } from 'src/providers/useWallet';
import { formatAddress } from 'src/utils/format';

import { useIsPrivy } from './useWalletHooks';

export function useShowAccount() {
  const { providerInfo, account } = useWalletWeb3();
  const isAppH5 = useIsAppH5();

  const isPrivy = useIsPrivy();
  return useMemo(() => {
    if (providerInfo?.name === 'app') {
      const { walletName, accountName, walletType } = providerInfo;
      // sync | email | createMnemonic | importMnemonic
      if (walletType === 'email') {
        return accountName ?? '';
      }
      if (walletType === 'sync') {
        return accountName ?? '';
      }
      return `${walletName} - ${accountName}`;
    }
    if (isAppH5) {
      return providerInfo?.name;
    }
    if (isPrivy) {
      return maskEmail(providerInfo?.email ?? '');
    }
    return formatAddress(account);
  }, [isPrivy, account, providerInfo, isAppH5]);
}

export const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email;

  const [localPart, domainPart] = email.split('@');

  // 处理@符号左边部分
  let maskedLocalPart = localPart;
  if (localPart.length > 5) {
    maskedLocalPart = `${localPart.substring(0, 2)}***`;
  }

  // 处理@符号右边部分
  const domainParts = domainPart.split('.');
  const domainName = domainParts[0];
  const extension = domainParts.slice(1).join('.');

  let maskedDomainName = domainName;
  if (domainName.length > 5) {
    maskedDomainName = `${domainName.substring(0, 1)}***`;
  }

  return `${maskedLocalPart}@${maskedDomainName}.${extension}`;
};
