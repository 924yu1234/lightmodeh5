import React, { useEffect } from 'react';

import { useHideModals } from 'src/state/application/hooks';

export default function White() {
  const hideModal = useHideModals();
  useEffect(() => {
    hideModal({ all: true });
  }, [hideModal]);
  return <div></div>;
}
