import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getGiftInfo } from 'src/apps/gift/service';
import useWallet from 'src/providers/useWallet';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

import GiftBox from './box';
import List from './list';

export default function Detail() {
  const { id } = useParams();
  const [giftInfo, setGiftInfo] = useState<any>(null);
  const { deviceId } = useWallet();
  const { da_owner } = useDexAccount();
  useEffect(() => {
    getGiftInfo(id, deviceId, da_owner).then((res) => {
      setGiftInfo(res);
    });
  }, [id, deviceId, da_owner]);

  return (
    <StyledGiftBoxDetail>
      <div className="detail-inner">
        <div className="detail-content">
          <GiftBox giftInfo={giftInfo} />
          <List giftInfo={giftInfo} />
        </div>
      </div>
    </StyledGiftBoxDetail>
  );
}

const StyledGiftBoxDetail = styled.div`
  padding-top: 15px;
  height: 100%;
  width: 100%;

  background-color: ${({ theme }) => theme.bg};

  overflow: hidden;
  position: relative;

  .detail-inner {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    padding: 0 20px;
  }

  .detail-content {
    gap: 20px;
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
  }

  .go_back {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    cursor: pointer;
    line-height: 20px;
    display: flex;
    align-items: center;
    gap: 2px;
    width: 100%;
    height: 100%;
  }
`;
