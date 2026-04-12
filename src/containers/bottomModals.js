import React from 'react';

import AddFundsModal from 'src/components/AddFunds/modal';
import BridgeUsdcChooseTokenModal from 'src/components/BridgeUsdc/chooseToken';
import BridgeUsdcConfirmModal from 'src/components/BridgeUsdc/confirmModal';
import BridgeDetail from 'src/components/DetailModal/bridgeDetailModal';
import BrowserDetail from 'src/components/DetailModal/browserDetailModal';
import SwapOrderDetail from 'src/components/DetailModal/swapOrderModal';
import ClaimOrderDetailModal from 'src/components/Earn/modals/claimOrderDetail';
import DepositOrderDetailModal from 'src/components/Earn/modals/depositOrderDetail';
import WithdrawOrderDetailModal from 'src/components/Earn/modals/withdrawOrderDetail';
import ChooseGasTokenModal from 'src/components/EstNetworkFee/chooseGasToken';
import SelectUsdcModal from 'src/components/SelectUsdc/modal';
import BalanceManageMenu from 'src/mobiles/components/BalanceManageMenu';
import FilterNetwork from 'src/mobiles/components/FilterNetwork';

import SendDetailModal from 'js/components/DetailModal/sendDetailModal';
export default function BottomModals() {
  return (
    <>
      <BrowserDetail />
      <BridgeUsdcChooseTokenModal />
      <SendDetailModal />
      <BridgeUsdcConfirmModal />
      <DepositOrderDetailModal />
      <WithdrawOrderDetailModal />
      <ClaimOrderDetailModal />
      <ChooseGasTokenModal />
      <SwapOrderDetail />
      <BridgeDetail />
      <SelectUsdcModal />
      <AddFundsModal />
      <BalanceManageMenu />
      <FilterNetwork />
    </>
  );
}
