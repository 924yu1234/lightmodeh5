import React from 'react';
import styled from 'styled-components';

import GALinkWrapper from 'src/components/GA/LinkWrapper';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useTurboRangeProductName } from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';

export default function StepIndex({
  setStep,
}: {
  setStep: (step: 'step1' | 'step2' | 'step3') => void;
}) {
  const intl = useIntl();
  const { product } = useModals(ModalKeys.turboRangeOutOfRangeTips);

  const name = useTurboRangeProductName(product.poolAddress);
  return (
    <StyledStepIndex>
      <div className="step-title">
        {intl.turboRange.what_do_you_think_XXX_s_price_will_do_next.replace(
          '{XXX}',
          name
        )}
      </div>
      <GALinkWrapper eventName="turbo_range_out_of_range_tips_step1_rise_and_move_back_into_my_price_range">
        <div className="step-btn" onClick={() => setStep('step1')}>
          {intl.turboRange.rise_and_move_back_into_my_price_range}
        </div>
      </GALinkWrapper>
      <GALinkWrapper eventName="turbo_range_out_of_range_tips_step1_move_sideways_around_the_current_price">
        <div className="step-btn" onClick={() => setStep('step2')}>
          {intl.turboRange.move_sideways_around_the_current_price}
        </div>
      </GALinkWrapper>
      <GALinkWrapper eventName="turbo_range_out_of_range_tips_step1_keep_falling">
        <div className="step-btn" onClick={() => setStep('step3')}>
          {intl.turboRange.keep_falling}
        </div>
      </GALinkWrapper>
    </StyledStepIndex>
  );
}

const StyledStepIndex = styled.div`
  .step-title {
    font-size: 16px;
    line-height: 22px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-bottom: 20px;
    text-align: center;
  }
  .step-btn {
    background: ${({ theme }) => theme.bg_131a2a};
    border: 1px solid ${({ theme }) => theme.border_white_10};
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
    cursor: pointer;
    margin-top: 15px;
    @media (hover: hover) {
      &:hover {
        border: 1px solid ${({ theme }) => theme.border_blue};
      }
    }
  }
`;
