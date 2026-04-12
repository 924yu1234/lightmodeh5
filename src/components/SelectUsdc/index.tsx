import React, { useEffect, useMemo, useRef } from 'react';
import { orderBy as orderByFn } from 'lodash';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import {
  useFungibleUsdc,
  useIsLoadingDABalance,
} from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';

import IconArrowDown from '../Icons/arrowDown';
import TokenIcon from '../Token/icon';

export default function SelectUsdc({
  loading,
  usdc,
  selectUsdc,
  modalKey,
  initChainWhileNoBalances,
}: {
  loading?: boolean;
  usdc?: Token;
  selectUsdc: (usdc: Token) => void;
  modalKey?: string;
  initChainWhileNoBalances?: Type_DAChains;
}) {
  const showModal = useShowModal();
  const loadingBalance = useIsLoadingDABalance();
  const showLoading = loading || loadingBalance;
  const fungibleUsdc = useFungibleUsdc();
  const sortedFungibleUsdc = useMemo(() => {
    return orderByFn(fungibleUsdc?.balances, ['availableNumber'], ['desc']);
  }, [fungibleUsdc?.balances]);

  useEffect(() => {
    if (!usdc && sortedFungibleUsdc?.length > 0 && !showLoading) {
      // selectUsdc(sortedFungibleUsdc?.[0]);
      if (Number(fungibleUsdc?.available) === 0 && initChainWhileNoBalances) {
        const _usdc = sortedFungibleUsdc?.find(
          (d) => d.chain === initChainWhileNoBalances
        );
        if (_usdc) {
          selectUsdc(_usdc);
        } else {
          selectUsdc(sortedFungibleUsdc?.[0]);
        }
      } else {
        selectUsdc(sortedFungibleUsdc?.[0]);
      }
    }
  }, [
    usdc,
    sortedFungibleUsdc,
    selectUsdc,
    showLoading,
    initChainWhileNoBalances,
    fungibleUsdc?.available,
  ]);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <StyledSelectUsdc>
      <div
        ref={ref}
        className="select-usdc-innner"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          showModal({
            modal: modalKey || ModalKeys.chooseUsdc,
            usdc,
            selectUsdc,
          });
          ref.current?.focus();
        }}
      >
        {!usdc || showLoading ? (
          <>
            <Skeleton height={28} width={28} circle />
            <Skeleton height={18} width={42.2} style={{ marginLeft: 4 }} />
          </>
        ) : (
          <>
            <TokenIcon token={usdc} size={28} />
            <div className="usdc-symbol">{usdc?.symbol}</div>
          </>
        )}
        <IconArrowDown />
      </div>
    </StyledSelectUsdc>
  );
}

const StyledSelectUsdc = styled.div`
  .select-usdc-innner {
    display: flex;
    min-width: 115px;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    background: ${({ theme }) => theme.bg_b7b_10};
    border-radius: 18px;
    height: 36px;
    padding: 4px 8px 5px 5px;
    .usdc-symbol {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 16px;
      line-height: 22px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    }
  }
`;
