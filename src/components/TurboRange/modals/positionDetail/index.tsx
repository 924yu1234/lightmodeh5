import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import BottomModal from 'src/components/Modals/bottomModal';
import {
  useRefreshTurboRangePostions,
  useRefreshTurboRangePostionsIndex,
} from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { useGetTurboRangeDetail } from 'src/state/turboRange/service';
import { ThemeType, useThemeParams } from 'src/theme';
import { logger } from 'src/utils/logger';

import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import TurboRangeDetailClosed from './closed';
import MobileDetail from './mobile';
import PCDetail from './web';

const POLL_INTERVAL = 30000;

export default function TurboRangeDetailModal() {
  const {
    visible,
    hide,
    position: positionData,
  } = useModals(ModalKeys.turboRangeDetail);
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

  const fetchDetail = useCallback(() => {
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
    getTurboRangeDetail,
    positionData?.positionAddress,
    positionData?.duration,
    positionData?.status,
    refrehPostions,
  ]);

  useEffect(() => {
    fetchDetail();
  }, [refreshPostionsIndex, fetchDetail]);

  // Poll for current hour data updates
  useEffect(() => {
    if (!visible || !positionData?.positionAddress) return undefined;
    const timer = setInterval(fetchDetail, POLL_INTERVAL);
    return () => clearInterval(timer);
  }, [visible, positionData?.positionAddress, fetchDetail]);

  const location = useLocation();
  const isChartPage = location.pathname.includes('/turbo-range/info');

  const modalWidth = useMemo(() => {
    if (isMobile) return '100%';
    return '896px';
  }, [isMobile]);

  if (isChartPage) {
    return null;
  }

  return (
    <StyledBottomModal
      onClose={hideModal}
      opened={visible}
      className="full-modal"
      noHeader={isMobile}
      modalWidth={modalWidth}
    >
      <StyledModal className="modal-wrapper">
        <div className="modal-content-wrapper">
          {position && (
            <div className="modal-content" id="turboRangeDetail">
              {position?.status !== 'OPEN' && (
                <TurboRangeDetailClosed
                  position={position}
                  historyVisible={false}
                  toggleHistory={() => {}}
                />
              )}
              {position?.status === 'OPEN' && isMobile && (
                <MobileDetail position={position} loading={loading} />
              )}
              {position?.status === 'OPEN' && !isMobile && (
                <PCDetail
                  position={position}
                  loading={loading}
                  onClose={hideModal}
                />
              )}
            </div>
          )}
        </div>
      </StyledModal>
    </StyledBottomModal>
  );
}

const StyledBottomModal = styled(BottomModal)<{
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
      width: 100%;
      overflow: hidden;
      padding-top: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? 52 : 10}px;
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
