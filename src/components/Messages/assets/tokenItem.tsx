import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { formatUnits } from 'src/ethers/utils';
import { useSwapTokenInDex } from 'src/hooks/SwapToken';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useReadAssetMessages } from 'src/state/message/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import MessageTime from '../messageTime';

export default function AssetMessageTokenItem({ data }: { data: any }) {
  const readed = data.readed;
  const readMessage = useReadAssetMessages();
  const intl = useIntl();
  const { token: swapToken } = useSwapTokenInDex({
    id: data.token_id,
  });

  const token = swapToken;

  const symbol = token?.symbol || '';
  const navigate = useCustomNavigate();

  const title = useMemo(() => {
    switch (data.op) {
      // depositStart
      case 1:
        return intl.XXX_fund_addition_processing.replace('XXX', symbol);
      // depositConfirm
      case 2:
        return intl.XXX_fund_addition_successful.replace('XXX', symbol);
      // crossChainDepositConfirm
      case 3:
        return intl.XXX_fund_addition_successful.replace('XXX', symbol);
      // 4 withdrawConfirm
      // 8 DA提现
      case 4:
      case 8:
        return intl.XXX_send_successful.replace('XXX', symbol);
      // crossChainWithdrawConfirm
      case 5:
        return intl.XXX_send_successful.replace('XXX', symbol);
      // transfer
      case 6:
        return intl.XXX_send_successful.replace('XXX', symbol);
      // airdrop
      case 7:
        return intl.you_have_received_a_new_airdrop;
      default:
        return '';
    }
  }, [data.op, intl, symbol]);

  const content = useMemo(() => {
    const amount = digit.formatInGroupSeparator(
      formatUnits(data.volume, token?.decimals)
    );
    switch (data.op) {
      case 1:
      case 2:
      case 3:
        return intl.add_AMOUNT_XXX_to_DeGate
          .replace('XXX', symbol)
          .replace('AMOUNT', amount);
      case 4:
      case 8:
        return intl.send_AMOUNT_XXX_to_Ethereum
          .replace('XXX', symbol)
          .replace('AMOUNT', amount)
          .replace('Ethereum', data.chain);
      case 5:
        return intl.send_AMOUNT_XXX_to_Ethereum
          .replace('XXX', symbol)
          .replace('AMOUNT', amount)
          .replace('Ethereum', data.chain);
      case 6:
        return intl.send_AMOUNT_XXX_to_DeGate
          .replace('XXX', symbol)
          .replace('AMOUNT', amount);
      case 7:
        return intl.AMOUNT_XXX_can_be_claimed_after_YYYY_MM_DD.replace(
          'XXX',
          symbol
        )
          .replace('AMOUNT', amount)
          .replace('YYYY-MM-DD', dayjs(data.createTime, 'YYYY-MM-DD'));

      default:
        return '';
    }
  }, [data, intl, token, symbol]);

  const url = useMemo(() => {
    switch (data.op) {
      case 1:
      case 2:
      case 4:
      case 3:
      case 5:
        return '/account/history/bridge';
      case 6:
      case 8:
        return '/account/history/send';
      case 7:
        return '/airdrop';
      default:
        return '';
    }
  }, [data]);

  return (
    <StyledItem
      className={`${readed ? '' : 'unreaded'}`}
      onClick={() => {
        if (!readed) {
          readMessage({ ids: [data.id], readAll: false });
        }
        navigate(url);
      }}
    >
      <div className="item-title">
        {title}
        <div className="item-time">
          <MessageTime time={data.createTime as number} />
        </div>
        <div className="point-wrapper">
          {!readed && <div className="point" />}
        </div>
      </div>
      <div className="item-content">{content}</div>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid
    ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
  cursor: pointer;
  word-break: break-word;

  .item-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    display: flex;
    align-items: flex-start;

    .item-time {
      padding-left: 5px;
      margin-left: auto;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      word-break: normal;
      white-space: nowrap;
    }
    .point-wrapper {
      margin-left: 5px;
      width: 6px;
      margin-top: 7px;
      .point {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }
  &.unreaded {
    cursor: pointer;
  }
  .item-content {
    margin-top: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }
`;
