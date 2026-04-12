import React, { useEffect, useMemo, useState } from 'react';
import logo_dark from 'imgs/logo_dark.svg';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getGiftInfo } from 'src/apps/gift/service';
import { TOKEN_SOL_ICON } from 'src/da';
import { useIntl } from 'src/locals';
import useWallet, { useGaEvent } from 'src/providers/useWallet';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

import Claim from './claim';
import HasReceived from './hasReceived';
import TipsConnect from './tipsConnect';
import Unclaimable from './unclaimable';

export default function DashboardInApph5() {
  const { id } = useParams();
  const { deviceId } = useWallet();
  const [giftInfo, setGiftInfo] = useState<any>(null);
  const intl = useIntl();
  const dexAccount = useDexAccount();
  const gaEvent = useGaEvent();

  useEffect(() => {
    gaEvent('gift', {
      code: id,
      deviceId,
      device: 'APP',
      owner: dexAccount?.da_owner,
    });
    getGiftInfo(id, deviceId, dexAccount?.da_owner).then((res) => {
      setGiftInfo(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, deviceId]);
  const hasClaimed = giftInfo?.hasClaimedByDevice;

  const unclaimable = useMemo(
    () => !giftInfo?.claimable || giftInfo?.isExpired,
    [giftInfo]
  );

  const claimable = useMemo(
    () => giftInfo?.claimable && !giftInfo?.isExpired,
    [giftInfo]
  );

  const hasSyncDA = dexAccount?.hasSyncDA;

  if (!giftInfo) {
    return (
      <StyledGiftBox>
        <img src={logo_dark} className="logo" alt="logo" />
        <div className="title">{intl.gift.Gift_Box}</div>
        <div className="box">
          <div className="box-title">{intl.gift.Cash_Gift_for_CopyTrade}</div>
          <div className="box-volume">
            <img src={TOKEN_SOL_ICON} alt="SOL" className="token-icon" />
            -- SOL
          </div>
        </div>
      </StyledGiftBox>
    );
  }

  return (
    <StyledGiftBox>
      <img src={logo_dark} className="logo" alt="logo" />
      <div className="title">{intl.gift.Gift_Box}</div>

      {hasClaimed ? (
        <HasReceived giftInfo={giftInfo} />
      ) : (
        <>
          {unclaimable && <Unclaimable giftInfo={giftInfo} />}
          {claimable && hasSyncDA && <Claim giftInfo={giftInfo} />}
          {claimable && !hasSyncDA && <TipsConnect giftInfo={giftInfo} />}
        </>
      )}
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
  padding-top: 60px;
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

  .box {
    width: 300px;
    height: 300px;
    background: ${({ theme }: { theme: ThemeType }) => theme.green};
    border-radius: 50%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .box-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${(props) => props.theme.t_000_aa};
      font-size: 18px;
      line-height: 24px;
      padding: 0 20px;
    }
    .box-volume {
      margin-top: 15px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      color: ${({ theme }) => theme.t_000};
      font-size: 22px;
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      .token-icon {
        width: 24px;
        border-radius: 50%;
        height: 24px;
      }
    }
    .box-tips {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 16px;
      line-height: 20px;
      color: ${(props) => props.theme.t_000_aa};
      text-align: center;
      margin-top: 15px;
    }
  }
`;
