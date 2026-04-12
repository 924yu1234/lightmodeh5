import { useCallback } from 'react';

import {
  isLedgerAccountNotMatch,
  isLedgerDisconnect,
  isLedgerLocked,
  isUserCancel,
  isWalletModalCancel,
} from 'js/ethers/utils';
import { useIntl } from 'js/locals';
import {
  ConnectionErr,
  NetworkErr,
  useWalletOprs,
} from 'js/providers/useWallet';
import { logWalletError } from 'js/utils/log';
import { logger } from 'js/utils/logger';

import createApiErrorTips from './useCreateApiErrorTips';

export default function useCreateWalletErrorTips() {
  const intl = useIntl();
  const { windowRefresh } = useWalletOprs();
  return useCallback(
    (error: any) => {
      logger.info(error);
      let errorMessage = error?.message || error?.reason || '';

      if (typeof error === 'string') {
        errorMessage = error;
      }

      if (errorMessage?.includes('Not found wallet')) {
        return errorMessage;
      }

      if (!error) return '';

      logWalletError({
        message: errorMessage,
        error,
        log_error: 'wallet error',
      });
      if (typeof error === 'string') {
        if (isUserCancel(error)) {
          return intl.wallet_cancelled_tips;
        }
        return intl.common_err;
      }
      if (isLedgerLocked(error) || isLedgerAccountNotMatch(error)) {
        return '';
      }
      if (isWalletModalCancel(error)) {
        return '';
      }
      if (isLedgerDisconnect(error)) {
        windowRefresh();
        return '';
      }
      if (error?.message?.includes('modal exist')) return '';
      if (error?.code === NetworkErr || error?.code === ConnectionErr) {
        return '';
      }
      if (isUserCancel(error)) {
        return intl.wallet_cancelled_tips;
      }
      if (error?.code === -32000) {
        return errorMessage || intl.common_err;
      }
      if (error?.message?.includes('Ledger Device is busy')) {
        return errorMessage;
      }
      if (
        errorMessage?.includes('token registered') ||
        errorMessage?.includes('TOKEN_ALREADY_EXIST')
      ) {
        return intl['account.register_token_code_err_added'];
      }
      if (
        errorMessage?.includes(
          'Please enable Blind signing or Contract data in the Ethereum app Settings'
        )
      ) {
        return intl.ledger_contract_data_tips;
      }
      return createApiErrorTips({ error, intl });
      // if (isLedger) return intl.common_err_ledger_version;
      // if (error?.message) return error?.message;
    },
    [intl, windowRefresh]
  );
}
