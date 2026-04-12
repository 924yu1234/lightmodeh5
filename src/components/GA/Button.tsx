import React from 'react';

import { Button as MantineButton, UIButtonProps } from 'src/UI';

import { useGaEvent } from 'src/providers/useWallet';

const GAButton = React.forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    eventName: string;
    eventData?: any;
  } & UIButtonProps
>(({ children, ...props }, ref) => {
  const { onClick, eventName, eventData } = props;
  const gaEvent = useGaEvent();
  return (
    <MantineButton
      ref={ref}
      {...props}
      onClick={(e: any) => {
        onClick?.(e);
        gaEvent?.('web_button_click', { buttonName: eventName, ...eventData });
      }}
    >
      {children}
    </MantineButton>
  );
});

GAButton.displayName = 'GAButton';

export default GAButton;
