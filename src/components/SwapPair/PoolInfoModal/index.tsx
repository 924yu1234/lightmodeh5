import React from 'react';
import dayjs from 'dayjs';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import IconCopy from 'src/components/Icons/copy';
import IconWrapper from 'src/components/Icons/IconWrapper';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { usePoolCreatedString } from 'src/utils/date';
import { formatPoolAddress } from 'src/utils/format';
import message from 'src/utils/message';

import Close from 'js/components/Icons/close';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function SwapPoolInfoModal() {
  const { ticker, visible, hide } = useModals(ModalKeys.swapPoolInfo);
  const { pool_created_at } = ticker || {};
  const intl = useIntl();
  const timeCreated = pool_created_at;
  const poolCreatedString = usePoolCreatedString();

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledPairInfoModal>
        <div className="modal-title">
          {intl.pool_info}
          <Close onClick={hide} />
        </div>
        <div className="item">
          <div className="item-title">{intl.DEX}</div>
          <div className="item-value">{ticker.dex}</div>
        </div>
        <div className="item">
          <div className="item-title">{intl.pool}</div>
          <div className="item-value">{ticker.chain_pair_name}</div>
        </div>
        <div className="item ">
          <div className="item-title">{intl.pool_address}</div>
          <CopyToClipboard
            text={ticker.pool_address}
            onCopy={() => message.success(intl.copied)}
          >
            <div className="item-value">
              {formatPoolAddress(ticker.pool_address)}
              <IconWrapper
                title={intl.icon_copy}
                size={16}
                className="copy"
                hideHoverBg
              >
                <IconCopy size={16} />
              </IconWrapper>
            </div>
          </CopyToClipboard>
        </div>
        {!!timeCreated && (
          <div className="item time">
            <div className="item-title">{intl.pool_created}</div>
            <div className="item-value">
              {dayjs(timeCreated).format('YYYY-MM-DD HH:mm')}
              <br />({poolCreatedString(timeCreated / 1000)})
            </div>
          </div>
        )}
      </StyledPairInfoModal>
    </Modal>
  );
}

const StyledPairInfoModal = styled.div`
  width: 100%;
  padding: 0 15px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .modal-title {
    margin-bottom: 20px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
    line-height: 16px;
    gap: 10px;

    .item-title {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b_80};
      white-space: nowrap;
    }
    .item-value {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_fff};
      line-height: 16px;
      display: flex;
      align-items: center;
      text-align: right;
      gap: 5px;
    }
  }
`;
