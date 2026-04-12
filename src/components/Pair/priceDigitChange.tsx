import React, { useMemo } from 'react';

import digit, { isNumber } from 'js/utils/digit';

export default function PriceDigitChange({
  price_change,
}: {
  price_change: any;
}): any {
  const percentDisplay = useMemo(() => {
    if (!isNumber(price_change)) {
      return '';
    }
    return `${digit.format(price_change, '0,0.00', {
      showPlus: true,
    })}`;
  }, [price_change]);

  if (percentDisplay === '') {
    return '--';
  }
  return (
    <span
      className={`pair-price-change ${price_change > 0 ? 'color-up' : ''} ${
        price_change < 0 ? 'color-down' : ''
      }`}
    >
      {percentDisplay}
    </span>
  );
}
