import { useCallback } from 'react';
import { sumBy } from 'lodash';

import { useCheckLeaveSurvey } from 'src/state/send/sendService';
import { isLessThan, minus, multiply } from 'src/utils/numberUtils';

import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import { isNumber } from 'js/utils/digit';

import { useBalances } from './useAssets';

export function useLeavingSurvey({
  withdrawToken,
  withdranTokenAmount,
  gasToken,
}: {
  withdrawToken: any;
  withdranTokenAmount: any;
  gasToken: any;
}) {
  const totalTokens = useBalances();
  const showModal = useShowModal();
  const checkHasLeaveSurvey = useCheckLeaveSurvey();
  const checkleavingSurvey = useCallback(() => {
    const totalAsset = sumBy(totalTokens, (t: any) => {
      const value = isNumber(t.value) ? Number(t.value) : 0;
      const lockedValue =
        Number(t?.frozenWithdraw ?? 0) * Number(t?.price ?? 0);
      return value - lockedValue;
    });
    const withdrawTokenData = totalTokens.find(
      (token: any) => token?.code === withdrawToken.code
    );
    const withdrawTokenValue = multiply(
      withdrawTokenData?.price ?? '0',
      withdranTokenAmount ?? '0',
      { toNumber: true }
    );
    const withdrawGasTokenData = totalTokens.find(
      (token: any) => token?.code === gasToken.code
    );
    const withdrawGasTokenValue = multiply(
      withdrawGasTokenData?.price ?? '0',
      gasToken?.volumeFormat ?? '0',
      { toNumber: true }
    );
    const valueAfterWithdraw = minus(
      minus(totalAsset, withdrawTokenValue),
      withdrawGasTokenValue
    );

    if (isLessThan(valueAfterWithdraw, 10)) {
      setTimeout(() => {
        checkHasLeaveSurvey()
          .then((resp: any) => {
            if (resp?.data === true) {
              showModal({ modal: ModalKeys.leaveSurvey });
            }
          })
          .catch(() => {});
      }, 500);
    }
  }, [
    totalTokens,
    withdrawToken?.code,
    withdranTokenAmount,
    gasToken?.code,
    gasToken?.volumeFormat,
    showModal,
    checkHasLeaveSurvey,
  ]);

  return checkleavingSurvey;
}
