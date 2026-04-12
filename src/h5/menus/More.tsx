import React from 'react';

import LinkWrapper from 'src/components/LinkWrapper';
import useCustomNavigate from 'src/hooks/useCustomNavigate';

import RightOutlined from 'js/components/Icons/RightOutlined';
import UpOutlined from 'js/components/Icons/UpOutlined';
import { DOC_LINK } from 'js/constants/dex';
import { useIntl } from 'js/locals';
import WindowOpen from 'js/utils/windowOpen';

export default function More({
  isShowSelect,
  setIsShowSelect,
}: {
  isShowSelect: boolean;
  setIsShowSelect: () => void;
}) {
  const intl = useIntl();
  const navigate = useCustomNavigate();

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
        {/* <div className="menu-item-child" onClick={showExplanation}>
          {intl.fees}
        </div> */}
        <LinkWrapper url={DOC_LINK}>
          <div
            className="menu-item-child"
            onClick={() => {
              WindowOpen(DOC_LINK);
            }}
          >
            {intl.document}
          </div>
        </LinkWrapper>
        <div
          className="menu-item-child"
          onClick={() => {
            navigate('/check_referral');
          }}
        >
          {intl.referral}
        </div>
      </div>
    </div>
  );
}
