import { useCallback, useEffect } from 'react';
import { orderBy as orderByFn } from 'lodash';
import { useDispatch } from 'react-redux';

import { useSyncWalletStateActions } from 'src/bridge/stateSync';
import { useIntl } from 'src/locals';
import log, { logPerformance, logRequest } from 'src/utils/log';
import EVENTS from 'src/utils/log/EVENTS';
import { logger } from 'src/utils/logger';

import {
  useDexChainId,
  useInfoKey,
  useRefreshEnclavaInfoIndex,
} from 'js/state/application/hooks';

import {
  getInfo,
  setIsOnline,
  setRegionDisabled,
  updateGasPaymentCandidates,
} from './actions';
import {
  fetchChainConfig,
  fetchChainInfo,
  fetchEnclavaInfo,
  fetchGasPaymentCandidates,
  fetchInfo,
} from './service';

export default function ApplicationUpdater() {
  const dispatch = useDispatch();
  const { syncUpdateChainInfo } = useSyncWalletStateActions();
  const dexChainId = useDexChainId();
  const intl = useIntl();
  const infoKey = useInfoKey();
  const changeOnLine = useCallback(() => {
    dispatch(setIsOnline({ isOnline: !!navigator.onLine }));
  }, [dispatch]);

  useEffect(() => {
    changeOnLine();
    window.addEventListener('offline', changeOnLine);
    window.addEventListener('online', changeOnLine);
    return () => {
      window.removeEventListener('offline', changeOnLine);
      window.removeEventListener('online', changeOnLine);
    };
  }, [changeOnLine]);

  useEffect(() => {
    Promise.all([fetchChainConfig(), fetchChainInfo()]).then(
      ([chainConfig, chainInfo]) => {
        syncUpdateChainInfo({
          chainInfo: orderByFn(
            chainInfo,
            ['display_level', 'chain'],
            ['asc', 'asc']
          ),
          chainConfig,
        });
      }
    );
  }, [syncUpdateChainInfo]);

  useEffect(() => {
    const func = (event) => {
      if (event?.message?.includes('Loading chunk mining')) {
        // window.location.href = '/path_to_static_error_page.html';
        // windowRefresh();
        logPerformance({
          type: 'error',
          error: 'Loading chunk mining',
          message: event?.message,
        });
      }
    };
    window.addEventListener('error', func, true);
    return () => {
      window.removeEventListener('error', func, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intl.common_err]);

  useEffect(() => {
    fetchInfo()
      .then((resp) => {
        const ignoreServiceStatus = window.location?.href.includes(
          'ignoreServiceStatus'
        );
        const minOrderAmount =
          resp.min_limit_order_usd_value || resp.min_order_price; // usd
        window.max_additional_deduct = resp.max_additional_deduct;
        dispatch(
          getInfo({
            info: {
              androidAPK: resp.android_apk || '',
              chainId: resp.chain_id,
              depositAddress: resp.deposit_address,
              exchangeAddress: resp.exchange_address,
              withdrawalsAddress: resp.exchange_address,
              spotTradeAddress: resp.exchange_address,
              orderEffectiveDigits: resp.order_effective_digits,
              operatorAddress: resp.operator_address,
              operatorId: resp.operator_id,
              withdrawalTime: resp.withdrawal_time / 1000, // s
              withdrawalTimeTips: resp.withdrawal_time_tips / 1000, // s
              minOrderAmount,
              maxNoLockFundingOrderNum:
                resp.max_no_fund_locking_order_num || 5000,
              miningMinAmount: resp.mining_min_amount, // usd
              miningMinDuration: resp.mining_min_duration, // s
              minSwapAmount: resp.swap_min_amount || 15, // usdc
              swapWhiteFeatures: resp.white_features,
              minSwapSellAmount:
                resp.swap_min_sell_amount || resp.swap_min_amount || 15, // usdc
              releaseVersion: resp.release_version,
              payDeposit: {
                toAddress: resp.deposit_fee_confirm_address,
                toDegateAddress: resp.deposit_fee_confirm_de_gate_address,
                toDegateAccountId: resp.deposit_fee_confirm_de_gate_account_id,
                feeTokenId: resp?.deposit_fee_confirm_token_id,
                feeTokenVolume: resp?.deposit_fee_confirm_token_volume,
              },
              serviceStatus: {
                stopRegistered:
                  resp?.service_status?.stop_registered && !ignoreServiceStatus,
                stopService:
                  resp?.service_status?.stop_service && !ignoreServiceStatus,
                stopServiceTime: resp?.service_status?.stop_service_time,
                stopTrading: resp?.service_status?.stop_trading,
                stopSwap: resp?.service_status?.stop_swap,
              },
              raffleAllowRegion: resp.raffle_allow_region,
              raffleFlashAllowRegion: resp.raffle_flash_allow_region,
              usdcApy: resp.usdc_apy,
              max_additional_deduct: resp.max_additional_deduct,
              solBalanceLimit: 0,
              btcBalanceLimit: Number(resp.btc_balance_limit) || 0,
              solRentExemption: Number(resp.sol_rent_exemption) || 0,
              btcSwapBalanceLimit: Number(resp.btc_swap_balance_limit) || 0,
              simpleEarnDisabledDepositDAs:
                resp.simple_earn_disabled_deposit_das || [
                  '0x0F359FD18BDa75e9c49bC027E7da59a4b01BF32a',
                ],
              simpleEarnDisabledDAs: resp.simple_earn_disabled_das || [
                '0x0F359FD18BDa75e9c49bC027E7da59a4b01BF32a',
              ],
              turboRangeDisabledKlines: resp.turbo_range_disabled_klines || [
                '',
              ],
              turboRangeKlinesMap: {
                '0xeeb8f880ead7281a301ef2e6791a6bbe790603ed':
                  'https://www.geckoterminal.com/hyperliquid/pools/0x231ffe0b33268f5f1d597c60296e46b7',
              },
              buyWithCashLink: resp.buy_with_cash_link,
              JumpOutBrowser:
                resp.jump_out_browser ||
                '/micromessenger|qq/|weibo|mqqbrowser|alipay|dingtalk|taobao/',
            },
            dexChainId,
          })
        );
      })
      .catch((err) => {
        logger.error(err);
        logRequest({
          type: 'error',
          error: 'fetchInfo error',
          message: err.message,
        });
      });
  }, [dispatch, dexChainId]);

  const refreshEnclavaInfoIndex = useRefreshEnclavaInfoIndex();
  useEffect(() => {
    if (!infoKey) return;
    fetchEnclavaInfo()
      .then((resp) => {
        if (resp.is_region_code) {
          log([
            {
              id: EVENTS.show_check_ip_err,
              event: 'show_check_ip_err',
              log: JSON.stringify({
                log_error: 'ip err',
                regionCode: resp.region_code,
              }),
            },
          ]);
        }
        dispatch(
          setRegionDisabled({
            isRegionDisabled: resp.is_region_code,
            regionCode: resp.region_code,
            regionIntl: resp.disabled_region_code_info,
          })
        );
      })
      .catch((err) => {
        logger.error(err);
        logRequest({
          type: 'error',
          error: 'fetchEnclavaInfo error',
          message: err.message,
        });
      });
  }, [infoKey, refreshEnclavaInfoIndex, dispatch]);

  useEffect(() => {
    fetchGasPaymentCandidates().then((resp) => {
      dispatch(updateGasPaymentCandidates({ candidates: resp }));
    });
  }, [dispatch]);

  return null;
}

ApplicationUpdater.propTypes = {};
