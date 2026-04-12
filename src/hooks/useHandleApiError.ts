import { useCallback } from 'react';

import {
  ACCOUNT_BLACKLIST,
  ACCOUNT_IS_UPDATING,
  ACCOUNT_IS_UPDATING_2,
  ETH_GAS_ERR,
  FEE_BIPS_ERR,
  FORCE_WITHDRAWING_TOKEN,
  FORCE_WITHDRAWING_TOKEN_AS_GAS,
  GAS_ERR_2,
  GAS_ERR_3,
  INCOMPATIBLE_TOKEN,
  INSUFFICIENT_BALANCE_ERR,
  INSUFFICIENT_BALANCE_ERR_2,
  INSUFFICIENT_GAS_ERR,
  OrderBookMaximumLimitExceededError,
  OrderBookMinimumLimitNotReachedError,
  Partially_Filled_For_Liquidity,
  RISK_ORDER_LIMIT_ERR,
  Valid_Unitl_Error,
} from 'src/constants/apiErr';
import { GasToken, OrderDirs, Token } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import {
  useShowModalBlacklistTips,
  useShowModalResetingTips,
  useShowTipsModal,
} from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

export default function useHandleApiError() {
  const showErr = useShowTipsModal();
  const intl = useIntl();

  const showModalResetingTips = useShowModalResetingTips();
  const showModalBlacklistTips = useShowModalBlacklistTips();

  return useCallback(
    ({
      error,
      page,
      type,
      gasToken,
      orderDir,
      sellToken,
    }: {
      error: any;
      page?: 'trade' | 'grid';
      type?: 'spot' | 'grid' | 'swap';
      gasToken?: GasToken;
      orderDir?: OrderDirs;
      sellToken?: Token;
    }) => {
      if (error?.code === FEE_BIPS_ERR) {
        location.reload();
        return undefined;
      }
      if (error?.code === INCOMPATIBLE_TOKEN) {
        showErr({
          modal: ModalKeys.tips_incompatibleToken,
          page,
        });
        return undefined;
      }
      if (
        (error?.code === INSUFFICIENT_BALANCE_ERR ||
          error?.code === INSUFFICIENT_BALANCE_ERR_2) &&
        type !== 'swap'
      ) {
        showErr({
          modal: ModalKeys.err_insufficientBalance_order,
          orderDir,
          sellToken,
          gasToken,
        });
        return undefined;
      }
      if (
        error?.code === INSUFFICIENT_GAS_ERR ||
        error?.code === GAS_ERR_2 ||
        error?.code === GAS_ERR_3
      ) {
        showErr({
          modal: ModalKeys.err_insufficientFee,
          feeToken: gasToken,
        });
        return undefined;
      }
      if (error?.code === ETH_GAS_ERR) {
        showErr({
          modal: ModalKeys.tips_eth_gas,
          type,
        });
        return undefined;
      }
      if (error?.code === Partially_Filled_For_Liquidity) {
        showErr({
          modal: ModalKeys.tips_partiallyFilledByLiquidity,
          type,
        });
        return undefined;
      }
      if (
        error?.code === ACCOUNT_IS_UPDATING ||
        error?.code === ACCOUNT_IS_UPDATING_2
      ) {
        showModalResetingTips();
        return undefined;
      }
      if (error?.code === ACCOUNT_BLACKLIST) {
        showModalBlacklistTips();
        return undefined;
      }
      if (error?.code === Valid_Unitl_Error) {
        return { handledMessage: intl.err_valid_until };
      }
      if (error?.code === RISK_ORDER_LIMIT_ERR) {
        return { handledMessage: intl.trade_risk_orders_tips };
      }
      if (error?.code === OrderBookMinimumLimitNotReachedError) {
        return {
          handledMessage: intl.order_faild_min_limit,
        };
      }
      if (error?.code === OrderBookMaximumLimitExceededError) {
        return {
          handledMessage: intl.order_faild_max_limit,
        };
      }
      if (
        error?.code === FORCE_WITHDRAWING_TOKEN ||
        error?.code === FORCE_WITHDRAWING_TOKEN_AS_GAS
      ) {
        return {
          handledMessage: intl.force_withdrawing_token_tips,
        };
      }

      return error;
    },
    [showErr, showModalResetingTips, showModalBlacklistTips, intl]
  );
}
