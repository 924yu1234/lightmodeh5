import React from 'react';

import { useLongPress } from 'src/hooks/useLongPress';

export default function PressWrapper({
  children,
  handlePress,
}: {
  children: React.ReactNode;
  handlePress: (accelerationLevel?: number) => void;
}) {
  const minusLongPress = useLongPress({
    onLongPress: (accelerationLevel) => handlePress(accelerationLevel),
    onClick: () => handlePress(1),
    threshold: 300,
    accelerationInterval: 300,
    maxAcceleration: 100,
  });

  return (
    <div {...minusLongPress} className="press-wrapper">
      {children}
    </div>
  );
}
