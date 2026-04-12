import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import { TOKEN_SOL_ICON } from 'src/da';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';

export default function HasReceived({ giftInfo }: { giftInfo: any }) {
  const intl = useIntl();
  const navigate = useCustomNavigate();

  return (
    <StyledTipsConnect>
      <div className="box">
        <div className="box-title">
          {
            intl.gift
              .This_gift_box_was_claimed_by_a_different_account_you_previously_used
          }
        </div>
        <div className="box-volume">
          {giftInfo?.tokenSymbol === 'SOL' && (
            <img
              src={TOKEN_SOL_ICON}
              alt={giftInfo?.tokenSymbol}
              className="token-icon"
            />
          )}
          {giftInfo?.amountPerClaim} {giftInfo?.tokenSymbol}
        </div>
      </div>
      <PrimaryBtn
        eventName="btn_gift_box_to_View_Gift_Box"
        onClick={() => {
          navigate(`/gift/detail/${giftInfo?.code}`);
        }}
      >
        {intl.gift.View_Gift_Box}
      </PrimaryBtn>
    </StyledTipsConnect>
  );
}

const StyledTipsConnect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .dg-primary {
    margin-top: 45px;
    min-width: 230px;
  }
`;
