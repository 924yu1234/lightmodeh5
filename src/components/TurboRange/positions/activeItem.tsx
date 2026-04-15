import React from 'react';

import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { TurboRangePosition } from 'src/state/turboRange/reducer';

import PositionStatus from '../positionStatus';
import PriceRangeBar from '../priceRangeBar';
import ProductName from '../productName';

export default function ActiveItem({
  position,
  inBalancePage,
}: {
  position: TurboRangePosition;
  inBalancePage: boolean;
}) {
  const showModal = useShowModal();
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const { baseToken } = position;
  const last24hApyText = position.last24hApy_display || '--';
  return (
    <div
      key={position.id}
      className="item"
      onClick={() => {
        if (inBalancePage) {
          navigate(
            `/turbo-range/positions?position=${position.positionAddress}`
          );
        } else {
          showModal({
            modal: ModalKeys.turboRangeDetail,
            position,
          });
        }
      }}
    >
      <div className="item-top">
        <TokenIcon token={baseToken} size={28} hideChainIcon />
        <div className="item-symbol">
          <ProductName poolAddress={position?.poolAddress} />
        </div>
        <PositionStatus position={position} hideInRange />
      </div>
      <div className="item-price-range">
        <PriceRangeBar position={position} />
      </div>
      <div className="item-infos item-infos-3col">
        <div className="item-info">
          <div className="item-info-title">{intl.turboRange.position}</div>
          <div className="item-info-value">
            {position.positionValue_display}
          </div>
        </div>
        <div className="item-info">
          <div className="item-info-title">
            {intl.turboRange.all_time_yield}
          </div>
          <div className="item-info-value color-green">
            {position.totalYield_display}
          </div>
        </div>
        <div className="item-info">
          <div className="item-info-title">{intl.turboRange.last_24h_apy}</div>
          <div
            className={`item-info-value ${
              Number(position.last24hApy) > 0 ? 'color-green' : ''
            }`}
          >
            {last24hApyText}
          </div>
        </div>
      </div>
    </div>
  );
}
