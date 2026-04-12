import React from 'react';

import { useGaEvent } from 'src/providers/useWallet';

export default function GALinkWrapper({
  children,
  eventName,
  eventData,
  className,
  onClick,
}: {
  children: React.ReactNode;
  eventName: string;
  eventData?: any;
  className?: string;
  onClick?: (e?: any) => void;
}) {
  const gaEvent = useGaEvent();
  return (
    <div
      onClick={(e) => {
        onClick?.(e);
        gaEvent?.('web_link_click', { buttonName: eventName, ...eventData });
      }}
      className={className}
    >
      {children}
    </div>
  );
}
