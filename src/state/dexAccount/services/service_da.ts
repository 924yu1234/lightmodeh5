import { useCallback } from 'react';

import { DA } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useWalletWeb3 } from 'src/providers/useWallet';
import axios, { useCreateHeaders, useHandleCommonErr } from 'src/utils/axios';

import { useDexAccount } from '../hooks';

export const getIntentAccount = ({ account }: { account: string }) => {
  return axios({
    method: 'GET',
    url: `order-book-api/intent/account?l0_address=${account}`,
  })
    .then((resp: any) => {
      const { owner, owner_referral_code } = resp.data || {};
      return {
        account,
        da_owner: owner,
        ownerReferralCode: owner_referral_code,
      };
    })
    .catch((err) => {
      if (err?.code === 100000) {
        return { account, da_owner: '', ownerReferralCode: '' };
      }
      return Promise.reject(err);
    });
};

export const useGetDA = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();

  return useCallback(() => {
    const headers = createHeaders();
    if (!dexAccount?.hasAccessToken) return Promise.resolve({});

    return axios({
      method: 'GET',
      url: '/order-book-api/intent/daAddress',
      headers,
    })
      .then((resp: any) => {
        const {
          key_nonce_when_addr_generate,
          addresses,
          features,
          referral_code,
          is_in_whitelist,
        } = resp?.data ?? {};

        return {
          features,
          used_referral_code: referral_code,
          keyNonce: key_nonce_when_addr_generate,
          isInWhitelist: is_in_whitelist,
          addresses,
        };
      })
      .catch((err) => handleCommonErr(err));
  }, [handleCommonErr, createHeaders, dexAccount.hasAccessToken]);
};

export const useSyncDA = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const { account } = useWalletWeb3();

  return useCallback(
    ({
      DAs,
      keyNonce,
      referralCode,
      giftCode,
    }: {
      DAs?: {
        [chain in Type_DAChains]: DA;
      };
      keyNonce: number;
      referralCode?: string;
      giftCode?: string;
    }) => {
      const headers = createHeaders();
      const _chains = Object.values(DAs ?? {}).map((d) => d.chain);
      const DGWalletDA = DAs?.DGWallet;
      const signatureChains =
        DGWalletDA?.signatureChains?.split(',') || _chains || [];
      const time = DGWalletDA?.time;
      const data = {
        l0_address: account,
        wallet_id: DGWalletDA?.address,
        // web固定为0
        account_index: 0,
        referral_code: referralCode ? `${referralCode}`.trim() : undefined,
        gift_code: giftCode || undefined,
        sig_time_stamp_in_msec: 0,
        key_nonce_when_addr_generate: keyNonce,
        wallet_da_signature: DGWalletDA?.signature,
        addresses: signatureChains
          .map((chain) => {
            const d = (DAs?.[chain as Type_DAChains] || {}) as DA;
            if (!d?.chain || d?.chain === 'DGWallet') return undefined;
            return {
              chain_name: d.chain?.toUpperCase(),
              chain_addresses_info: [
                {
                  public_key: d.publicKey,
                  address: d.address,
                  address_path: d.path,
                  sig: d.signature,
                },
              ],
            };
          })
          .filter((d) => d),
      };
      data.sig_time_stamp_in_msec = time ?? 0;

      if (Date.now() - data.sig_time_stamp_in_msec > 1000 * 100) {
        return Promise.reject({
          code: 100000,
          message: 'Signature expired',
        });
      }

      return axios({
        method: 'POST',
        url: '/order-book-api/intent/daAddress',
        data,
        headers,
      })
        .then((resp: any) => {
          return resp.data || {};
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, account, createHeaders]
  );
};
