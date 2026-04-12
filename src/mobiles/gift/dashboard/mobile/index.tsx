import React, { useEffect, useMemo, useState } from 'react';
import logo_dark from 'imgs/logo_dark.svg';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getGiftInfo } from 'src/apps/gift/service';
import { useIntl } from 'src/locals';
import useWallet, { useGaEvent } from 'src/providers/useWallet';
import { ThemeType } from 'src/theme';

import Claimable from './claimable';
import Unclaimable from './unclaimable';

export default function DashboardMobile() {
  const { id } = useParams();
  const { deviceId } = useWallet();
  const [giftInfo, setGiftInfo] = useState<any>(null);
  const intl = useIntl();
  const gaEvent = useGaEvent();

  useEffect(() => {
    gaEvent('gift', {
      code: id,
      deviceId,
      device: 'mobile',
    });
    getGiftInfo(id, deviceId).then((res) => {
      setGiftInfo(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, deviceId]);

  const unclaimable = useMemo(
    () => !giftInfo?.claimable || giftInfo?.isExpired,
    [giftInfo]
  );

  return (
    <StyledGiftBox>
      <img src={logo_dark} className="logo" alt="logo" />
      <div className="title">{intl.gift.Gift_Box}</div>
      {unclaimable && <Unclaimable giftInfo={giftInfo} />}
      {!unclaimable && <Claimable giftInfo={giftInfo} />}
    </StyledGiftBox>
  );
}

const StyledGiftBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px;
  .logo {
    width: 94.1px;
    margin-bottom: 20px;
  }
  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontImpact};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 40px;
    line-height: 40px;
    text-align: center;
  }

  .dg-primary {
    height: 46px;
    border-radius: 23px;
    min-width: 230px;
  }
`;
