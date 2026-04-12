import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import styled, { createGlobalStyle } from 'styled-components';

import Hash from 'src/components/Hash';
import BottomModal from 'src/components/Modals/bottomModal';
import PaginationWithTotal from 'src/components/Pagination/withTotal';
import TokenSymbol from 'src/components/Token/symbol';
import { useThemeParams } from 'src/theme';
import { formatNetworFeeValue } from 'src/utils/format';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import { StyledMiningTable } from '../components/Table/miningTable';
import { useFetchReferralClaimHistory } from './service';

export default function ClaimHistoryModal() {
  const { visible, hide, content, onHide } = useModals(
    ModalKeys.kol_claim_history
  );
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchReferralClaimHistory = useFetchReferralClaimHistory();

  useEffect(() => {
    if (visible) {
      setLoading(true);
      fetchReferralClaimHistory({ pageSize, current }).then((res) => {
        setData(res.list);
        setTotal(res.total);
        setLoading(false);
      });
    }
  }, [visible, fetchReferralClaimHistory, current, pageSize]);

  const intl = useIntl();

  const hideModal = () => {
    if (onHide) onHide();
    hide();
  };

  const columns = [
    {
      title: intl.token,
      width: 160,
      dataIndex: ['id'],
      render: (v: any, d: any) => {
        return <TokenSymbol token={d.token} />;
      },
    },
    {
      title: intl.amount,
      width: 100,
      dataIndex: ['amount_display'],
    },
    {
      title: intl.time,
      width: 100,
      dataIndex: ['created_at'],
      render: (v: any) => {
        return dayjs(v * 1000).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: intl.network_fee,
      width: 100,
      dataIndex: ['network_fee_estimated'],
      render: (v: any) => {
        return <div>${formatNetworFeeValue(v)}</div>;
      },
    },
    {
      title: intl['account.th_tx_hash'],
      width: 100,
      align: 'center',
      dataIndex: ['tx_hash'],
      render: (v: any, d: any) => {
        return <Hash txHash={v} chainId={d.token?.chain as any} />;
      },
    },
  ];
  const theme = useThemeParams();

  const scroll = useMemo(() => {
    if (!theme.isMobile) {
      return undefined;
    }
    return { x: 600 };
  }, [theme.isMobile]);

  const width = useMemo(() => {
    if (theme.isMobile) {
      return theme.windowWidth - 45;
    }
    return 'auto';
  }, [theme.isMobile, theme.windowWidth]);

  return (
    <BottomModal
      onClose={hideModal}
      opened={visible}
      className="kol-claim-history-modal full-modal"
      size={800}
    >
      <StyledCommonTips className="modal-wrapper">
        <div className="modal-title">
          {intl.Claim_History}
          <Close onClick={hideModal} />
        </div>
        <div className="modal-content">
          <div className="title">{content}</div>
          <div style={{ width }}>
            <StyledMiningTable
              loading={loading}
              columns={columns}
              dataSource={data}
              rowKey="id"
              scroll={scroll}
              disabledHideScrollBar={!!scroll}
            />
          </div>
          <PaginationWithTotal
            current={current}
            onChange={(cur: number) => {
              setCurrent(cur);
            }}
            total={total}
            pageSize={pageSize}
            setPageSize={setPageSize}
            hidePageSizeSelect
          />
        </div>
      </StyledCommonTips>
      <StyledGlobalStyle />
    </BottomModal>
  );
}

const StyledCommonTips = styled.div`
  width: 100%;
  padding: 0 16px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalText};
    font-size: 14px;
    line-height: 24px;
    width: 100%;
    text-align: center;
  }

  .desc {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalDesc};
    font-size: 14px;
    line-height: 24px;
    margin: 10px 0 0;
  }

  .dg-primary {
    width: 100%;
    margin-top: 30px;
  }
`;

const StyledGlobalStyle = createGlobalStyle`
  .kol-claim-history-modal {
    .mantine-Modal-content {
      padding: 0;
      max-width: ${({ theme }) =>
        theme.isMobile ? `${theme.windowWidth}px` : '1000px'};
    }
  }
`;
