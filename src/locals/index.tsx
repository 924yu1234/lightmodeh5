import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import lodashMerge from 'lodash/merge';
import PropTypes from 'prop-types';

// UED: wallet locale files are merged into en/zh
import walletEn from 'src/wallet/locals/en';
import walletZhCN from 'src/wallet/locals/zh-CN';

import useWallet from 'js/providers/useWallet';

import de from './de';
import deComp from './de-Comp';
import en from './en';
import enComp from './en-Comp';
import es from './es';
import esComp from './es-Comp';
import fr from './fr';
import frComp from './fr-Comp';
import { createRes, LANGUAGES } from './intlUtils';
import it from './it';
import itComp from './it-Comp';
import ja from './ja-JP';
import jaComp from './ja-JP-Comp';
import kr from './kr';
import krComp from './kr-Comp';
import map from './map';
import ru from './ru';
import ruComp from './ru-Comp';
import tr from './tr';
import trComp from './tr-Comp';
import ukUA from './uk-UA';
import ukUAComp from './uk-UA-Comp';
import vi from './vi';
import viComp from './vi-Comp';
import zhCN from './zh-CN';
import zhCNComp from './zh-CN-Comp';
import zhTW from './zh-TW';
import zhTWComp from './zh-TW-Comp';

interface IntlInterface {
  [key: string]: any;
}

// type IntlInterface = Record<keyof typeof en, any>;

interface IntlSetInterface {
  locale: 'zh-CN' | 'en-US' | 'zh-TW';
  languagePath: string;
  setLocale: (locale: string) => void;
}

const Context = React.createContext<IntlInterface>({} as IntlInterface);
const SetContext = React.createContext<IntlSetInterface>(
  {} as IntlSetInterface
);
export const intlContext = Context;

export default function Intl({ children }: { children: ReactNode }) {
  const { handleLocaleChange, locale: walletLocale } = useWallet();
  const [locale, setLocale] = useState(walletLocale || 'en-US');

  useEffect(() => {
    let urlLocale = '';
    if (location.href.includes('/en/')) {
      urlLocale = 'en-US';
    } else if (location.href.includes('/zh-CN/')) {
      urlLocale = 'zh-CN';
    } else if (location.href.includes('/zh-TW/')) {
      urlLocale = 'zh-TW';
    } else if (location.href.includes('/it/')) {
      urlLocale = 'it';
    } else if (location.href.includes('/ru/')) {
      urlLocale = 'ru';
    } else if (location.href.includes('/uk-UA/')) {
      urlLocale = 'uk-UA';
    } else if (location.href.includes('/ja-JP/')) {
      urlLocale = 'ja-JP';
    } else if (location.href.includes('/tr/')) {
      urlLocale = 'tr';
    } else if (location.href.includes('/de/')) {
      urlLocale = 'de';
    } else if (location.href.includes('/es/')) {
      urlLocale = 'es';
    } else if (location.href.includes('/fr/')) {
      urlLocale = 'fr';
    } else if (location.href.includes('/kr/')) {
      urlLocale = 'kr';
    } else if (location.href.includes('/vi/')) {
      urlLocale = 'vi';
    }
    if (urlLocale) {
      setLocale(urlLocale);
    }
  }, []);

  useEffect(() => {
    if (walletLocale) {
      setLocale(walletLocale);
    }
  }, [walletLocale]);

  const localeMessage = useMemo(() => {
    // UED: deep-merge wallet locale files (shallow spread would clobber
    // nested objects like `turboRange` because wallet only defines a few keys)
    const enRes = lodashMerge({}, en, enComp, walletEn);
    const zhRes = lodashMerge({}, zhCN, zhCNComp, walletZhCN);
    const twRes = { ...zhTW, ...zhTWComp };
    const itRes = { ...it, ...itComp };
    const ruRes = { ...ru, ...ruComp };
    const ukRes = { ...ukUA, ...ukUAComp };
    const jaRes = { ...ja, ...jaComp };
    const trRes = { ...tr, ...trComp };
    const deRes = { ...de, ...deComp };
    const esRes = { ...es, ...esComp };
    const frRes = { ...fr, ...frComp };
    const krRes = { ...kr, ...krComp };
    const viRes = { ...vi, ...viComp };

    let res: any = enRes;
    if (locale === 'en-US') {
      res = enRes;
    } else if (locale === 'zh-CN') {
      res = createRes({ res: zhRes, enRes });
    } else if (locale === 'it') {
      res = createRes({ res: itRes, enRes });
    } else if (locale === 'zh-TW') {
      res = createRes({ res: twRes, enRes });
    } else if (locale === 'ru') {
      res = createRes({ res: ruRes, enRes });
    } else if (locale === 'uk-UA') {
      res = createRes({ res: ukRes, enRes });
    } else if (locale === 'ja-JP') {
      res = createRes({ res: jaRes, enRes });
    } else if (locale === 'tr') {
      res = createRes({ res: trRes, enRes });
    } else if (locale === 'de') {
      res = createRes({ res: deRes, enRes });
    } else if (locale === 'es') {
      res = createRes({ res: esRes, enRes });
    } else if (locale === 'fr') {
      res = createRes({ res: frRes, enRes });
    } else if (locale === 'kr') {
      res = createRes({ res: krRes, enRes });
    } else if (locale === 'vi') {
      res = createRes({ res: viRes, enRes });
    }

    // logKeys({
    //   deRes,
    //   enRes,
    //   zhRes,
    //   twRes,
    //   jaRes,
    //   itRes,
    //   ruRes,
    //   trRes,
    //   ukRes,
    //   krRes,
    //   esRes,
    //   frRes,
    //   viRes,
    // });

    // toCsv({
    //   enRes,
    //   deRes,
    //   jaRes,
    //   itRes,
    //   ruRes,
    //   trRes,
    //   ukRes,
    //   krRes,
    //   esRes,
    //   frRes,
    //   zhRes,
    //   twRes,
    //   viRes,
    // });

    Object.values(map).forEach((mapItem) => {
      res[mapItem.from] = res[mapItem.to];
    });

    return res;
  }, [locale]);

  // useEffect(() => {
  //   checkKey({ en, target: it, targetName: 'it' });
  //   checkKey({ en, target: ja, targetName: 'ja' });
  //   checkKey({ en, target: ru, targetName: 'ru' });
  //   checkKey({ en, target: tr, targetName: 'tr' });
  //   checkKey({ en, target: ukUA, targetName: 'uk-UA' });
  //   checkKey({ en, target: zhCN, targetName: 'zh-CN' });
  //   checkKey({ en, target: zhTW, targetName: 'zh-TW' });
  //   checkKey({ en, target: de, targetName: 'de' });
  //   checkKey({ en, target: es, targetName: 'es' });
  //   checkKey({ en, target: fr, targetName: 'fr' });
  //   checkKey({ en, target: kr, targetName: 'kr' });
  //   checkKey({ en, target: vi, targetName: 'vi' });
  // }, []);

  // 勿删
  window.intl = localeMessage;

  const value = useMemo(() => {
    const path = LANGUAGES.find((d) => d.key === locale)?.path;

    return {
      languagePath: path || 'en',
      locale: locale as 'zh-CN' | 'en-US',
      setLocale: (val: string) => {
        setLocale(val);
        if (handleLocaleChange) {
          handleLocaleChange(val);
        }
      },
    };
  }, [locale, handleLocaleChange]);

  return (
    <Context.Provider value={localeMessage}>
      <SetContext.Provider value={value}>{children}</SetContext.Provider>
    </Context.Provider>
  );
}

Intl.propTypes = {
  children: PropTypes.any,
};

export function useSetLocale() {
  return useContext(SetContext);
}

export function useIntl(): any {
  return useContext(Context);
}
