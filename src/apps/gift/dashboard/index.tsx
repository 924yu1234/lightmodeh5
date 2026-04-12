import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import useWallet, { useGaEvent, useWalletWeb3 } from 'src/providers/useWallet';
import { ThemeType } from 'src/theme';

import { getGiftInfo } from '../service';
import Step1 from './step1';
import Step2 from './step2';

export default function Dashboard() {
  const { id } = useParams();
  const { deviceId } = useWallet();
  const [giftInfo, setGiftInfo] = useState<any>(null);
  const { account } = useWalletWeb3();
  const [step, setStep] = useState(1);
  const gaEvent = useGaEvent();
  const intl = useIntl();

  useEffect(() => {
    setStep(1);
    gaEvent('gift', {
      code: id,
      deviceId,
      device: 'pc',
    });
    getGiftInfo(id, deviceId).then((res) => {
      setGiftInfo(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, deviceId, account]);

  return (
    <StyledGiftBox>
      <div className="gift-box-title">{intl.gift.Gift_Box}</div>

      {step === 1 && (
        <Step1 giftInfo={giftInfo || {}} goStep2={() => setStep(2)} />
      )}
      {step === 2 && <Step2 giftInfo={giftInfo || {}} />}
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
  padding-top: 70px;

  .gift-box-title {
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
      text-align: center;
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
