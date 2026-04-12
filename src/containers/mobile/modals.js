import React from 'react';

import LeftBar from 'js/mobiles/components/LeftBar';
import RightBar from 'js/mobiles/components/RightBar';

import CommonModals from '../modals';

export default function Modals() {
  return (
    <>
      <CommonModals />
      <LeftBar />
      <RightBar />
    </>
  );
}
