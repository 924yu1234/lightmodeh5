import React from 'react';

import { PrimaryBtn } from 'src/UI';

import { CommonToken, Vault } from 'src/constants/interface';
import { useGaEvent, useHasAccessToken } from 'src/providers/useWallet';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useIsFetchingVaultDetail } from 'src/state/intent/earn/hooks';
import { logEarn } from 'src/utils/log/swap';

import { useIntl } from 'js/locals';

export default function ClaimBtn({
  vault,
  rewardToken,
  claimOrderAddress,
  disabled,
}: {
  vault: Vault;
  rewardToken?: CommonToken;
  claimOrderAddress?: string;
  disabled?: boolean;
}) {
  const intl = useIntl();
  const hasAccessToken = useHasAccessToken();
  const isFetchingDetail = useIsFetchingVaultDetail(vault);
  const showModal = useShowModal();
  const gaEvent = useGaEvent();

  const claim = () => {
    gaEvent('create_earn_claim_order', {
      method: 'pending',
      vault: {
        id: vault.id,
        description: undefined,
      },
    });
    logEarn({
      event: 'earn claim pending',
      vault: {
        id: vault.id,
      },
    });
    const order = {
      ...vault,
      marketAddress: vault.detail?.orderAddress,
      address: vault.address,
      type: 'claim',
      rewardToken,
      claimOrderAddress,
      vault,
    };

    showModal({
      modal: ModalKeys.EARN_CLAIM_MODAL,
      order,
    });
  };

  if (isFetchingDetail || !hasAccessToken || !vault) return null;

  return (
    <PrimaryBtn
      eventName="btn_earn_claim"
      disabled={disabled}
      loading={isFetchingDetail}
      onClick={claim}
    >
      {intl.Claim}
    </PrimaryBtn>
  );
}
