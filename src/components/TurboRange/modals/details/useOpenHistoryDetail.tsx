import { useCallback } from 'react';

import { TurboRangeHistoryType } from 'src/constants/consts';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';

export default function useOpenHistoryDetail() {
  const showModal = useShowModal();
  return useCallback(
    (item: any) => {
      if (item.type === TurboRangeHistoryType.LP_DEPOSIT) {
        showModal({
          modal: ModalKeys.turboRangeDepositDetail,
          order: item,
        });
      }
      if (item.type === TurboRangeHistoryType.LP_WITHDRAW) {
        showModal({
          modal: ModalKeys.turboRangeWithdrawDetail,
          order: item,
        });
      }
      if (item.type === TurboRangeHistoryType.LP_CLAIM) {
        showModal({
          modal: ModalKeys.turboRangeRewardDetail,
          order: item,
        });
      }
      if (item.type === TurboRangeHistoryType.LP_ADD_DEPOSIT) {
        showModal({
          modal: ModalKeys.turboRangeIncreaseInvestmentDetail,
          order: item,
        });
      }
    },
    [showModal]
  );
}
