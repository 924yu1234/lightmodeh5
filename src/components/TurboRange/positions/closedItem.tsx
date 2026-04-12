import React, { useCallback } from 'react';

import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { useCreatePosition } from 'src/state/turboRange/useCreatePosition';

import PositionStatus from '../positionStatus';
import ProductName from '../productName';

export default function ClosedItem({
  position,
  inBalancePage,
}: {
  position: TurboRangePosition;
  inBalancePage: boolean;
}) {
  const showModal = useShowModal();
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const { baseToken, minPrice, maxPrice } = position;

  const createPosition = useCreatePosition();
  const handleReopen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      createPosition({
        poolAddress: position.poolAddress,
        minPrice: position.minPrice,
        maxPrice: position.maxPrice,
        source: 'reopen',
      });
    },
    [createPosition, position]
  );

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
        <PositionStatus position={position} />
      </div>
      <div className="item-infos">
        <div className="item-info">
          <div className="item-info-title">{intl.turboRange.price_range}</div>
          <div className="item-info-value">
            {minPrice} - {maxPrice}
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
      </div>
      <div className="item-actions">
        <button
          type="button"
          className="btn-view-details"
          onClick={(e) => {
            e.stopPropagation();
            showModal({
              modal: ModalKeys.turboRangeDetail,
              position,
            });
          }}
        >
          {intl.turboRange.view_details}
        </button>
        <button type="button" className="btn-reopen" onClick={handleReopen}>
          {intl.turboRange.re_open}
        </button>
      </div>
    </div>
  );
}
