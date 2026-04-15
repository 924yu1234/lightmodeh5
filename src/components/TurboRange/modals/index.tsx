import React from 'react';

import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

import APPCreateTurboRangeOrderModal from '../app/confirmModal';
import CreatePositionModal from '../modals/createPosition';
import StrategyDetailModal from '../strategies/strategyDetailModal';
import ApyBacktestModal from './apyBacktest/modal';
import TurboRangeClaimConfirmModal from './claimConfirm';
import TurboRangeRewardDetailModal from './details/claimDetail';
import TurboRangeDepositDetailModal from './details/depositDetail';
import TurboRangeIncreaseInvestmentDetailModal from './details/increseInvestmentDetail';
import TurboRangeWithdrawDetailModal from './details/withdrawDetail';
import AboutTurboRangeModal from './faq/aboutTurboRange';
import HourlyBreakdownModal from './hourlyBreakdown';
import IncreaseInvestmentModal from './increaseInvestmemt';
import OutOfRangeTipsModal from './outOfRangeTips/modal';
import TurboRangeDetailModal from './positionDetail';
import TurboRangePositionHistoryModal from './positionHistory';
import TurboRangeClaimProgressModal from './processModals/claimProcess';
import TurboRangeDepositProgressModal from './processModals/depositProcess';
import TurboRangeIncreaseProgressModal from './processModals/increaseProcess';
import TurboRangeWithdrawProgressModal from './processModals/withdrawProcess';
import SetPriceRangeModal from './setPriceRange';
import TurboRangeWithdrawConfirmModal from './withdrawConfirm';

export default function TurboRangeModals() {
  const modals = useModals();
  return (
    <>
      <SetPriceRangeModal />

      {modals[ModalKeys.APP_CREATE_TURBO_RANGE_ORDER]?.visible && (
        <APPCreateTurboRangeOrderModal />
      )}
      <TurboRangeDetailModal />
      {modals[ModalKeys.turboRangeClaimConfirm]?.visible && (
        <TurboRangeClaimConfirmModal />
      )}
      {modals[ModalKeys.turboRangeWithdrawConfirm]?.visible && (
        <TurboRangeWithdrawConfirmModal />
      )}
      <TurboRangeDepositDetailModal />
      <TurboRangeRewardDetailModal />
      <TurboRangeWithdrawDetailModal />
      <TurboRangeIncreaseInvestmentDetailModal />
      {modals[ModalKeys.turboRangeDepositProgress]?.visible && (
        <TurboRangeDepositProgressModal />
      )}
      {modals[ModalKeys.turboRangeWithdrawProgress]?.visible && (
        <TurboRangeWithdrawProgressModal />
      )}
      {modals[ModalKeys.turboRangeClaimProgress]?.visible && (
        <TurboRangeClaimProgressModal />
      )}
      {modals[ModalKeys.turboRangeIncreaseProgress]?.visible && (
        <TurboRangeIncreaseProgressModal />
      )}
      <AboutTurboRangeModal />
      {modals[ModalKeys.turboRangeOutOfRangeTips]?.visible && (
        <OutOfRangeTipsModal />
      )}
      <ApyBacktestModal />
      {modals[ModalKeys.turboRangeIncreaseInvestment]?.visible && (
        <IncreaseInvestmentModal />
      )}
      {modals[ModalKeys.turboRangePositionHistory]?.visible && (
        <TurboRangePositionHistoryModal />
      )}
      {modals[ModalKeys.turboRangeStrategyDetail]?.visible && (
        <StrategyDetailModal />
      )}
      {modals[ModalKeys.turboRangeCreatePosition]?.visible && (
        <CreatePositionModal />
      )}
      {modals[ModalKeys.turboRangeHourlyBreakdown]?.visible && (
        <HourlyBreakdownModal />
      )}
    </>
  );
}
