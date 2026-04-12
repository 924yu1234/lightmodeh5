import React from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import { useIntl } from 'src/locals';
import { useModals, useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useTurboRangeProductName } from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';

export default function Step2({
  setStep,
}: {
  setStep: (step: 'index' | 'step1' | 'step2' | 'step3') => void;
}) {
  const intl = useIntl();
  const { product, hide, position } = useModals(
    ModalKeys.turboRangeOutOfRangeTips
  );
  const name = useTurboRangeProductName(product.poolAddress);
  const showModal = useShowModal();

  return (
    <StyledStepIndex>
      <div className="step-title">
        {intl.turboRange.if_you_think_XXX_s_price_will_move_sideways_around_the_current_price.replace(
          '{XXX}',
          name
        )}
      </div>
      <div className="you_will">{intl.turboRange.you_will}</div>
      <div className="step-item">
        {intl.turboRange.close_your_position_and_open_a_new_one}
      </div>
      <div className="btns">
        <GhostBtn
          className="btn"
          eventName="turbo_range_out_of_range_tips_step2_back"
          onClick={() => setStep('index')}
        >
          {intl.go_back}
        </GhostBtn>
        <PrimaryBtn
          className="btn"
          eventName="turbo_range_out_of_range_tips_step2_close_position"
          onClick={() => {
            hide();
            showModal({
              modal: ModalKeys.turboRangeWithdrawConfirm,
              position,
            });
          }}
        >
          {intl.turboRange.close_position}
        </PrimaryBtn>
      </div>
    </StyledStepIndex>
  );
}

const StyledStepIndex = styled.div`
  .step-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    text-align: center;
    line-height: 20px;
    margin-bottom: 25px;
  }
  .you_will {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    text-align: center;
    line-height: 24px;
    margin-bottom: 10px;
  }
  .step-item {
    background: ${({ theme }) => theme.bg_blue_10};
    border-radius: 8px;
    padding: 15px;
    line-height: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    user-select: none;
  }

  .btns {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    .btn {
      flex: 1;
    }
  }
`;
