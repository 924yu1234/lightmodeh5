import React from 'react';

import {
  useLogLanguageCompleted,
  useLogLanguageStart,
} from 'src/hooks/useEventTrack/utils/useLogLanguage';
import { LANGUAGES } from 'src/locals/intlUtils';

import CheckOutlined from 'js/components/Icons/CheckOutlined';
import RightOutlined from 'js/components/Icons/RightOutlined';
import UpOutlined from 'js/components/Icons/UpOutlined';
import { useIntl, useSetLocale } from 'js/locals';
import { useHideModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function LanguageChoose({
  isShowSelect,
  setIsShowSelect,
}: {
  isShowSelect: boolean;
  setIsShowSelect: () => void;
}) {
  const intl = useIntl();
  const { locale, setLocale } = useSetLocale();
  const hide = useHideModals(ModalKeys.m_rightBar);
  const logLanguageStart = useLogLanguageStart();
  const logLanguageCompleted = useLogLanguageCompleted();

  return (
    <div className="language-select menu-wrapper">
      <div
        className="menu-item"
        onClick={() => {
          logLanguageStart();
          setIsShowSelect();
        }}
      >
        {intl.Language}
        {isShowSelect ? <UpOutlined /> : <RightOutlined />}
      </div>
      {isShowSelect && (
        <>
          {LANGUAGES.filter((d) => !d.hide).map((l) => (
            <div
              key={l.key}
              className={`menu-item-child ${l.key === locale ? 'active' : ''}`}
              onClick={() => {
                logLanguageCompleted(locale, l.key);
                setLocale(l.key);
                hide();
              }}
            >
              <div className="dg-choose">
                {l.key === locale && <CheckOutlined />}
              </div>
              {l.label}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
