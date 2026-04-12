import React from 'react';

import { ExplanationsType } from 'src/components/Explanations';

import RightOutlined from 'js/components/Icons/RightOutlined';
import UpOutlined from 'js/components/Icons/UpOutlined';
import { useIntl } from 'js/locals';
import { useShowExplantion } from 'js/state/application/hooks';

export default function More({
  isShowSelect,
  setIsShowSelect,
}: {
  isShowSelect: boolean;
  setIsShowSelect: () => void;
}) {
  const intl = useIntl();
  const showExplanation = useShowExplantion(ExplanationsType.Fees);

  return (
    <div className="menu-wrapper">
      <div
        className="menu-item"
        onClick={() => {
          setIsShowSelect();
        }}
      >
        {intl.more}
        {isShowSelect ? <UpOutlined /> : <RightOutlined />}
      </div>
      <div className={isShowSelect ? 'show' : 'hide'}>
        <div className="menu-item-child" onClick={showExplanation}>
          {intl.fees}
        </div>
      </div>
    </div>
  );
}
