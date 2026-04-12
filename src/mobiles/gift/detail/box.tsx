import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { TOKEN_SOL_ICON } from 'src/da';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { multiply } from 'src/utils/numberUtils';

export default function GiftBox({ giftInfo }: { giftInfo: any }) {
  const intl = useIntl();
  const {
    totalSize,
    amountPerClaim,
    expiredAt,
    hasClaimedByMe,
    hasClaimedByDevice,
  } = giftInfo || {};
  const hasClaimed = hasClaimedByMe || hasClaimedByDevice;
  return (
    <StyledGiftBox>
      <div className="box-info">
        <div className="box-title">
          {hasClaimed
            ? intl.gift.Youve_received_a_Cash_Gift_for_CopyTrade.replace(
                '{GIFT TYPE}',
                intl.gift.Cash_Gift_for_CopyTrade
              )
            : intl.gift.Total_Gift_Amount}
        </div>
        <div className="box-volume">
          {giftInfo?.tokenSymbol === 'SOL' && (
            <img
              src={TOKEN_SOL_ICON}
              alt={giftInfo?.tokenSymbol}
              className="token-icon"
            />
          )}
          {hasClaimed ? amountPerClaim : multiply(amountPerClaim, totalSize)}{' '}
          {giftInfo?.tokenSymbol}
        </div>
        {!hasClaimed && expiredAt && (
          <div className="box-tips">
            {intl.gift.Expired_at_DATE.replace(
              'DATE',
              dayjs(expiredAt).format('YYYY-MM-DD HH:mm:ss')
            )}
          </div>
        )}
      </div>
      {hasClaimed && (
        <div className="total-amount">
          <div className="total-amount-title">
            {intl.gift.Total_Gift_Amount}
          </div>
          <div className="total-amount-value">
            {multiply(amountPerClaim, totalSize)} {giftInfo?.tokenSymbol}
          </div>
        </div>
      )}
    </StyledGiftBox>
  );
}

const StyledGiftBox = styled.div`
  .box-info {
    background: ${({ theme }) => theme.bg_blue_20};
    border-radius: 5px;
    width: 100%;
    height: 150px;
    padding: 25px;
  }
  .box-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }) => theme.t_fff};
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 10px;
  }
  .box-volume {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }) => theme.t_fff};
    font-size: 20px;
    line-height: 28px;
    display: flex;
    align-items: center;
    gap: 5px;
    .token-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    margin-bottom: 15px;
  }
  .box-tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }) => theme.t_fff_50};
    font-size: 12px;
    line-height: 18px;
  }
  .total-amount {
    margin-top: 10px;
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 5px;
    padding: 10px 25px;
    .total-amount-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      font-size: 12px;
      line-height: 24px;
    }
    .total-amount-value {
      margin-top: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }) => theme.t_fff};
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
