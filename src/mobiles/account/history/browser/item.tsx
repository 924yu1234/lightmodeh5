import React from 'react';
import styled from 'styled-components';

import ChainTokenIcon from 'src/components/ChainTokenIcon';
import IconBrowser from 'src/components/Icons/iconBrowser';
import { useGetBrowserUrl } from 'src/ethers/utils';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatAddress } from 'src/utils/format';
import WindowOpen from 'src/utils/windowOpen';

export default function HistoryItem({
  item,
  showTime,
  isFrstDay,
}: {
  item: any;
  showTime: string;
  isFrstDay: boolean;
}) {
  const { chain, tx_hash, to_address, chain_name } = item;
  const getBrowserUrl = useGetBrowserUrl();

  const url = getBrowserUrl({
    chainId: chain,
    tx_hash,
    address: '',
    code: '',
  });

  const intl = useIntl();

  return (
    <StyledItem
      className={`history-items ${showTime ? 'show-time' : ''}`}
      onClick={() => {
        WindowOpen(url);
      }}
      size={28}
    >
      <div className={`history-day ${isFrstDay ? 'first-day' : ''}`}>
        {showTime}
      </div>
      <div
        className="history-item-inner"
        onClick={() => {
          WindowOpen(url);
        }}
      >
        <div className="token-icon">
          <IconBrowser size={28} />
          <ChainTokenIcon chain={chain_name as any} />
        </div>
        <div className="item-text">
          {intl.Contract_Call}
          <div className="item-text-sub">{formatAddress(to_address)}</div>
        </div>
        <div className="amount"></div>
      </div>
    </StyledItem>
  );
}

const StyledItem = styled.div<{ size: number }>`
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  .token-icon {
    position: relative;
    width: ${(props: any) => props.size + props.size / 12}px;
    height: ${(props: any) => props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    .chain-token-icon {
      position: absolute;
      width: ${(props: any) => props.size / 2}px;
      height: ${(props: any) => props.size / 2}px;
      bottom: 0;
      right: 0;
      z-index: 1;
      border: 0.5px solid ${({ theme }) => theme.border_b7b_50};
      border-radius: 50%;
    }
  }

  .history-item-inner {
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 30px;
    height: 50px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  }
  .item-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }) => theme.t_f4f};
    line-height: 18px;
    .item-text-sub {
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      line-height: 18px;
    }
  }

  .tag-failed {
    background: ${({ theme }) => theme.bg_white_07};
    border-radius: 2px;
    padding: 0 10px;
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    height: 20px;
    line-height: 20px;
  }

  .amount {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    margin-left: auto;
    .amount-receive {
      font-size: 16px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
    .amount-pay {
      font-size: 11px;
      line-height: 11px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
`;
