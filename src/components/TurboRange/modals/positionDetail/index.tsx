import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import IconWrapper2 from 'src/components/Icons/IconWrapper2';
import IconPositionHistory from 'src/components/Icons/PositionHistory';
import BottomModal from 'src/components/Modals/bottomModal';
import { PositionHistoryPanel } from 'src/components/TurboRange/modals/positionHistory';
import {
  useRefreshTurboRangePostions,
  useRefreshTurboRangePostionsIndex,
} from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { useGetTurboRangeDetail } from 'src/state/turboRange/service';
import { ThemeType, useThemeParams } from 'src/theme';
import { logger } from 'src/utils/logger';

import Close from 'js/components/Icons/close';
import { useModals, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import TurboRangeDetailActive from './active';
import TurboRangeDetailClosed from './closed';

export default function TurboRangeDetailModal() {
  const {
    visible,
    hide,
    position: positionData,
  } = useModals(ModalKeys.turboRangeDetail);
  const showModal = useShowModal();
  const [historyVisible, setHistoryVisible] = useState(false);
  const getTurboRangeDetail = useGetTurboRangeDetail();
  const [position, setPosition] = useState<TurboRangePosition>(positionData);

  useEffect(() => {
    setPosition(positionData);
  }, [positionData]);

  const [loading, setLoading] = useState(true);
  const hideModal = () => {
    hide();
  };
  const refrehPostions = useRefreshTurboRangePostions();
  const refreshPostionsIndex = useRefreshTurboRangePostionsIndex();
  const { isMobile } = useThemeParams();

  useEffect(() => {
    setLoading(true);
  }, [positionData?.positionAddress]);

  useEffect(() => {
    if (!positionData?.positionAddress) return;
    getTurboRangeDetail({
      positionAddress: positionData.positionAddress,
      checkInitRet:
        positionData.duration && positionData.duration < 1000 * 60 * 60 * 24,
    })
      .then((res: any) => {
        if (res.status !== positionData.status) {
          refrehPostions();
        }
        setPosition(res as TurboRangePosition);
        setLoading(false);
      })
      .catch((err) => {
        logger.error('err', err);
        setLoading(false);
      });
  }, [
    refreshPostionsIndex,
    getTurboRangeDetail,
    positionData?.positionAddress,
    positionData?.duration,
    refrehPostions,
    positionData?.status,
  ]);

  const location = useLocation();
  const isChartPage = location.pathname.includes('/turbo-range/info');

  const modalWidth = useMemo(() => {
    if (isMobile) return '100%';
    return '460px';
  }, [isMobile]);

  const toggleHistory = useCallback(() => {
    if (!isMobile) {
      setHistoryVisible((pre) => !pre);
    } else {
      showModal({
        modal: ModalKeys.turboRangePositionHistory,
        position,
      });
    }
  }, [showModal, position, isMobile]);

  useEffect(() => {
    if (!visible) {
      setHistoryVisible(false);
    }
  }, [visible]);

  if (isChartPage) {
    return null;
  }

  return (
    <StyledBottomModal
      onClose={hideModal}
      opened={visible}
      className="full-modal"
      noHeader={isMobile}
      historyVisible={historyVisible}
      modalWidth={modalWidth}
    >
      <StyledModal className="modal-wrapper">
        {!isMobile && (
          <div className="modal-title">
            <Close onClick={hideModal} />
          </div>
        )}
        <div className="modal-content-wrapper">
          {position && (
            <div className="modal-content" id="turboRangeDetail">
              {position?.status === 'OPEN' ? (
                <TurboRangeDetailActive
                  position={position}
                  loading={loading}
                  toggleHistory={toggleHistory}
                  historyVisible={historyVisible}
                />
              ) : (
                <TurboRangeDetailClosed
                  position={position}
                  historyVisible={historyVisible}
                  toggleHistory={toggleHistory}
                />
              )}
            </div>
          )}
        </div>
      </StyledModal>
      {!isMobile && (
        <PositionHistoryPanel
          position={position}
          visible={historyVisible}
          toggleHistory={toggleHistory}
        />
      )}
      {!isMobile && !historyVisible && (
        <div className="web-position-history-btn">
          <IconWrapper2
            size={50}
            onClick={toggleHistory}
            className={historyVisible ? 'active' : ''}
          >
            <IconPositionHistory size={16} />
          </IconWrapper2>
        </div>
      )}
    </StyledBottomModal>
  );
}

const StyledBottomModal = styled(BottomModal)<{
  historyVisible: boolean;
  modalWidth: string;
}>`
  .mantine-Modal-content {
    background: transparent;
    width: ${({ modalWidth }: { modalWidth: string }) => modalWidth};
    max-width: ${({ modalWidth }: { modalWidth: string }) => modalWidth};
    min-width: ${({ modalWidth }: { modalWidth: string }) => modalWidth};
    transition: width 0.3s ease, max-width 0.3s ease, min-width 0.3s ease,
      background 0.3s ease;
  }
  .mantine-Modal-body {
    display: flex;
    height: 100%;
    overflow: visible;
    .modal-wrapper {
      background: #22223c;
      border-radius: 12px;
      width: 460px;
      min-width: 460px;
      overflow: hidden;
      padding-top: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? 52 : 10}px;
      .product {
        height: 52px;
      }
    }
  }
  .web-position-history-btn {
    position: absolute;
    right: -60px;
    top: 0px;
    .dg-icon-wrapper2 {
      background: #22223c;
      border-radius: 25px;
    }
  }
`;

const StyledModal = styled.div`
  width: 100%;
  position: relative;
  z-index: 11;

  .product {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
    .product-symbol {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 16px;
      line-height: 20px;
      margin-right: 5px;
    }
    .action-btns {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-left: auto;
    }
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    line-height: 20px;
    margin-bottom: 10px;
    .item-info-title {
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .item-info-value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .price-range {
    margin-bottom: 20px;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: ${(props) => {
      return props.theme.windowHeight - props.theme.modalTop - 100;
    }}px;
    overflow: auto;
  }
  .claim-btn {
    height: 30px;
    margin-left: auto;
  }
  .withdraw-btn {
    margin-top: auto;
    width: 100%;
  }
`;
