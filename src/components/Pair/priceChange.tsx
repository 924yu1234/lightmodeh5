import React, { useMemo } from 'react';

import digit, { isNumber } from 'js/utils/digit';

export default function PriceChange({
  price_change_percent,
  max99,
}: {
  price_change_percent: any;
  max99?: boolean;
}): any {
  const percentDisplay = useMemo(() => {
    if (!isNumber(price_change_percent)) {
      return '';
    }
    if (max99 && Number(price_change_percent) >= 9999.99) {
      return '>9,999.99%';
    }
    return `${digit.format(price_change_percent, '0,0.00', {
      showPlus: true,
    })}%`;
  }, [price_change_percent, max99]);

  if (percentDisplay === '') {
    return '--';
  }
  return (
    <span
      className={`pair-price-change ${
        price_change_percent > 0 ? 'color-up' : ''
      } ${price_change_percent < 0 ? 'color-down' : ''}`}
    >
      {percentDisplay}
    </span>
  );
}
