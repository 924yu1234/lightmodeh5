import React from 'react';
import styled from 'styled-components';

import IconLogoWhite from 'src/components/Icons/logoWhite';
import IconShareSharp from 'src/components/Icons/ShareSharp';
import TokenIcon from 'src/components/Token/icon';
import { useIntl } from 'src/locals';
import {
  TurboRangePosition,
  TurboRangeProduct,
} from 'src/state/turboRange/reducer';
import { formatTurboRangeDuration } from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';

import PriceRangeBar from '../../priceRangeBar';
import ProductName from '../../productName';

interface TurboRangeSharePosterDomProps {
  allTimeApyValue: string;
  position: TurboRangePosition;
  product: TurboRangeProduct;
  yesterdayApyValue: string;
}

const FIXED_DOWNLOAD_QR_CODE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAEEElEQVR4AeyZi1IbSwxEffj/f86lVz7jmdmXzSVUso4L0aNWS4t6gJjKx+12+/WV+DW9nCFtLsoH5c4w2j7O9Fv1LPjJX/ejLfjp1O2ZeNUKZ/Z9cqI1cxG4AZYbWj/DNLQFk1wxVgsCi2sw4t7yUDrdVDfn8oDH9pw9bRPuHIA2Ax7nXr5asC9e4fxtC0I5qClQORTK57Y8izBqoPJoE+q+gt+24Fce/hM937ZgnE7MX3S4BNStwAPD9wFVcwaMufwr+G0LvvLQn9SuFuwd7c+vflH2HvXBeEP2iEe9qambMTVjtaCFq2BbEMpNOMazxaH61UHluhy+Pyc3oLTmewilg2NMf1swyRXjQzdfxWfNcC6U28nhcU4+z4Kqz3y0r8b1bxBGt6ByOEbd1VEovbwIxfc6ayKMGnl7zKF0cIzqg9e/wWzZh67NuGg+P8l/HpcPKDeX5IlP6VcGYy9s5zDy9ouZ2Yc8cLv+Dbr57f6CcgtGvJfb31/mewjVP8+PXk4MlzAXwyXM9zCarYj++jcI5TQUZutnArb1W072HNBSYPmO8HkWYOSh8rn+TH79G9QFXYTX3LJfdI45jPNStybCWtPrck6ozzlhLkLNSS0R/n1uMNv2AeWGHFQeZxIzD1WHwmj6gOLhgX0957OZUL2zLr199PXr36Cbw+iOvG6IMOrkxb0+6z1CzYJCa87YQ3UiVD8Uyqd/9wZhFPdNadzL5UUY52z1hkvMPTD2Wp8xvX3Ao293wXnI35q3BXXARfZyKHfO6jDq1AM+oiGw/IPfiPvBnnvaAEpvHSqHQvk0tAWTXDE+oLZ2uX57uSCU7qwebR9QfXLp9wxjDcZ81sFYh8ozM6FeBN7gz6XbzgtGd+JQAoqHQttTS5gfYXR9qO25nKGekfNW2LeH6fmdP4N7z/1RfrUgjK7NX01c6eOsrlYd4HH5zQm0/zoHFq4JpgMc130WPHSrBaeZf326WlAX5s2gXIFC61A5FM68uZj5/Tk5VG/OCesiVH0v3+OBN/gtGscSt5NXNH2cyFc/V1C3AA+cZ0DVZr5/bn9WB9t9qa++RUNeKdo7GSgX4DnUhN7RnKH6rT+D6esDtmfANj8/o591/Rt0+37ro7N6EcpVKJQXndXnnmHsgTFXJ86zZn6uA2/wW/Q2vaBchBEn2dMp1BzdBVpvz8HjHY28QmB5hwMjWheh6ubB9/kZzLb/J3RdhHJzLw8PpfG5MObRbIV6azD29fV/N6gbzyLsuxnHMweONTDWoXIozIwEjHm4BDz497vBuLwVcWYr1M61mYdyFWhSNWIr3A/A8tvznrb3t+Yzbs35c25w/mq/KW8LQrkFxzg/F0ovv+WitWDqwT5gnGEt2j5mfs6h5tiT+n8AAAD//6JEgwsAAAAGSURBVAMAISn3IY7kuX4AAAAASUVORK5CYII=';

const TurboRangeSharePosterDom = React.forwardRef<
  HTMLDivElement,
  TurboRangeSharePosterDomProps
>(function TurboRangeSharePosterDomComponent(
  { allTimeApyValue, position, product, yesterdayApyValue },
  ref
) {
  const intl = useIntl();
  const { baseToken } = product;

  return (
    <StyledPoster ref={ref}>
      <div className="poster-main">
        <div className="header-title">
          <IconShareSharp className="share-icon" />
          <div className="header-title-inner">
            {intl.turboRange.my_turbo_range}
          </div>
          <IconShareSharp className="share-icon right-share-icon" />
        </div>
        <div className="poster-content">
          <div className="token-header">
            <TokenIcon
              token={baseToken}
              size={36}
              hideChainIcon
              className="token-icon"
            />
            <ProductName poolAddress={position?.poolAddress} />
          </div>

          <div className="yields-card">
            <div className="yield-label">{intl.turboRange.all_time_yield}</div>
            <div className="yield-label">{intl.turboRange.yesterday_yield}</div>
            <div className="yield-value">{position.totalYield_display}</div>
            <div className="yield-value green">
              {position.isYesterdayUpdating
                ? intl.turboRange.updating
                : `${position.yesterdayYield_display}`}
            </div>
            <div className="yield-label">{intl.turboRange.all_time_apy}</div>
            <div className="yield-label">{intl.turboRange.yesterday_apy}</div>
            <div className="yield-value">{allTimeApyValue}</div>
            <div className="yield-value green">{yesterdayApyValue}</div>
          </div>

          <div className="slider-wrap">
            <PriceRangeBar position={position} />
          </div>

          <div className="bottom-cards">
            <div className="small-card">
              <div className="small-label">
                {intl.turboRange.active_capital}
              </div>
              <div className="small-value">
                {position.principalValue_display}
              </div>
            </div>
            <div className="small-card">
              <div className="small-label">{intl.turboRange.duration}</div>
              <div className="small-value">
                {formatTurboRangeDuration(position.duration)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-content">
          <div className="qrcode-wrap">
            <img className="qrcode" src={FIXED_DOWNLOAD_QR_CODE} alt="" />
          </div>
          <div className="footer-texts">
            <div className="footer-title">
              {intl.turboRange.earn_yield_while_price_stays_in_your_range}
            </div>
            <div className="footer-desc">{intl.download_app}</div>
          </div>
        </div>
        <IconLogoWhite className="degate-logo" />
      </div>
    </StyledPoster>
  );
});

export default TurboRangeSharePosterDom;

const StyledPoster = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 420px;
  height: 585px;
  overflow: hidden;
  background: #000;
  color: #fff;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .poster-main {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 500px;
    background-color: #12133a;
    background-image: radial-gradient(
        circle at 50% 44%,
        rgba(0, 128, 255, 0.34) 0%,
        rgba(0, 128, 255, 0.18) 38%,
        rgba(0, 128, 255, 0) 72%
      ),
      linear-gradient(180deg, #13133d 0%, #173a7a 58%, #133061 100%);
    border-radius: 0 0 20px 20px;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 36px;
      background-image: linear-gradient(
        180deg,
        rgba(4, 11, 29, 0) 0%,
        rgba(4, 11, 29, 0.82) 70%,
        #000000 100%
      );
    }
  }

  .poster-content {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .header-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    margin-bottom: 30px;

    .share-icon {
      flex-shrink: 0;
    }

    .header-title-inner {
      background: ${({ theme }: { theme: ThemeType }) => theme.green};
      position: relative;
      z-index: 1;
      padding: 0 10px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      line-height: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_000};
      white-space: nowrap;
    }
    .right-share-icon {
      transform: scaleX(-1);
    }
  }

  .token-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 20px;
    line-height: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    white-space: nowrap;
  }

  .yields-card {
    position: relative;
    box-sizing: border-box;
    width: 335px;
    min-height: 150px;
    margin-top: 23px;
    padding: 10px 20px 10px;
    border: 1px solid rgba(183, 189, 198, 0.2);
    border-radius: 15px;
    background-image: radial-gradient(
      circle at 50% 51%,
      rgba(49, 49, 49, 0.1) 0%,
      rgba(216, 216, 216, 0.06) 73%
    );
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: auto auto auto auto;
    gap: 5px 0;
  }

  .yield-label {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 14px;
    line-height: 18px;
    text-align: left;
    word-break: break-word;
    padding-top: 10px;
    &:nth-child(1),
    &:nth-child(2) {
      padding-top: 0;
    }
    &:nth-child(3),
    &:nth-child(4) {
      border-top: 1px solid rgba(183, 189, 198, 0.2);
    }
  }

  .yield-value {
    overflow: hidden;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 26px;
    line-height: 26px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    padding-bottom: 10px;
    &:nth-child(7),
    &:nth-child(8) {
      padding-bottom: 0;
    }
  }

  .yield-value.green {
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
  }

  .slider-wrap {
    width: 335px;
    margin-top: 25px;
  }

  .slider-wrap .header {
    margin-bottom: 6px;
  }

  .slider-wrap .value {
    margin-top: 5px;
  }

  .slider-wrap .current-price-text {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    opacity: 0.8;
    transform: translateX(-50%);
  }

  .slider-wrap .position-status-icon {
    border-color: ${({ theme }: { theme: ThemeType }) => theme.border3};
  }

  .slider-wrap .position-status-icon .status-pointer-icon {
    box-shadow: 0 0 4px 0 rgba(94, 210, 162, 0.44);
  }

  .bottom-cards {
    width: 335px;
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(2, 160px);
    gap: 15px;
  }

  .small-card {
    box-sizing: border-box;
    border-radius: 8px;
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    padding: 11px 20px 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .small-label {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 14px;
    line-height: 18px;
    white-space: nowrap;
  }

  .small-value {
    margin-top: 6px;
    font-size: 18px;
    line-height: 18px;
    white-space: nowrap;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }

  .footer {
    box-sizing: border-box;
    min-height: 92px;
    padding: 15px 20px 17px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 6px;
    background: #000;
  }

  .footer-content {
    flex: 1;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    min-width: 0;
  }

  .qrcode-wrap {
    width: 60px;
    height: 60px;
    border-radius: 2px;
    background: #fff;
    flex-shrink: 0;
    padding: 5px;
    box-sizing: border-box;
  }

  .qrcode {
    display: block;
    width: 50px;
    height: 50px;
  }

  .footer-texts {
    min-width: 0;
    padding-top: 2px;
  }

  .footer-title {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .footer-desc {
    margin-top: 3px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
    font-size: 13px;
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .degate-logo {
    width: 70px;
    height: 14px;
    flex-shrink: 0;
    margin-bottom: 6px;
    position: absolute;
    bottom: 15px;
    right: 20px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
