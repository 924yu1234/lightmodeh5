import React from 'react';

import BuyBtn from './BuyBtn';
import GhostBtn from './GhostBtn';
import PrimaryBtn from './PrimaryBtn';
import SellBtn from './SellBtn';
import { UIButtonProps, UIButtonVariant } from './types';

export interface MiniBtnProps extends UIButtonProps {
  variant?: UIButtonVariant;
}

export default function MiniBtn({
  variant = 'primary',
  ...props
}: MiniBtnProps) {
  if (variant === 'ghost') return <GhostBtn uiSize="small" {...props} />;
  if (variant === 'buy') return <BuyBtn uiSize="small" {...props} />;
  if (variant === 'sell') return <SellBtn uiSize="small" {...props} />;
  return <PrimaryBtn uiSize="small" {...props} />;
}
