import { useCallback } from 'react';

import useWallet from 'src/providers/useWallet';

import useEventTrack from '..';
import { EventType } from '../service';

export type Initialize_Source =
  | ''
  | 'account_history'
  | 'account_balance'
  | 'account_walletBalance'
  | 'account_security'
  | 'account_history'
  | 'trade_openOrders'
  | 'trade_orderHistory'
  | 'trade_tradeHistory'
  | 'trade_btn'
  | 'grid_completed'
  | 'grid_running'
  | 'grid_btn'
  | 'dca_btn'
  | 'mining_grids'
  | 'mining_rewards'
  | 'mining_plan_grids'
  | 'modal_registerPair'
  | 'modal_addressChange'
  | 'modal_unlock'
  | 'm_leftBar'
  | 'm_rightBar'
  | 'airdrop'
  | 'countdown'
  | 'notification'
  | 'gridMarketplace'
  | 'earn'
  | 'raffle'
  | 'raffle_flash_op'
  | 'copy_trade_transfer_in'
  | 'copy_trade'
  | 'gift_box'
  | 'turbo_range'
  | 'bridge_usdc';

export type Initialize_Action =
  | 'exit'
  | 'click_sign'
  | '1st_signature_received'
  | '1st_signature_canceled'
  | '2nd_signature_canceled';

export function useLogInitializeStart() {
  const { account } = useWallet();
  const eventTrack = useEventTrack();

  return useCallback(
    (isFull: boolean, source: Initialize_Source) => {
      const time = new Date().getTime();
      const logInfo = {
        type: isFull ? '2' : '1',
        time,
        owner: account,
        source,
      };
      eventTrack({ type: EventType.initialization_started, data: logInfo });
    },
    [eventTrack, account]
  );
}

export function useLogInitializeStep({ isFull }: { isFull: boolean }) {
  const { account } = useWallet();
  const eventTrack = useEventTrack();
  return useCallback(
    (
      step: EventType,
      data?: {
        action: Initialize_Action;
      }
    ) => {
      const time = new Date().getTime();
      const logInfo = {
        ...data,
        type: isFull ? '2' : '1',
        time,
        owner: account,
      };
      eventTrack({ type: step, data: logInfo });
    },
    [eventTrack, account, isFull]
  );
}
