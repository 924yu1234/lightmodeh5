/* eslint-disable no-console */
/* eslint-disable no-continue */
import React from 'react';
import { get } from 'lodash';
import * as ReactDOMServer from 'react-dom/server';

// 1. trade-ssr
// 2. wallet seo.js

export const LANGUAGES = [
  {
    key: 'de',
    path: 'de',
    label: 'Deutsch', // 德语
    hide: false,
  },
  {
    key: 'en-US',
    path: 'en',
    label: 'English',
  },
  {
    key: 'es',
    path: 'es',
    label: 'Español', // 西班牙语
    hide: false,
  },
  {
    key: 'fr',
    path: 'fr',
    label: 'Français', // 法语
    hide: false,
  },
  {
    key: 'it',
    path: 'it',
    label: 'Italiano', // 意大利语
  },
  {
    key: 'ja-JP',
    path: 'ja-JP',
    label: '日本語',
    hide: false,
  },
  {
    key: 'kr',
    path: 'kr',
    label: '한국어',
    hide: false,
  },
  {
    key: 'ru',
    path: 'ru',
    label: 'Русский', // 俄语
    hide: false,
  },
  {
    key: 'uk-UA',
    path: 'uk-UA',
    label: 'Українська', // 乌克兰语
    hide: false,
  },
  {
    key: 'tr',
    path: 'tr',
    label: 'Türkçe', // 土耳其语
    hide: false,
  },
  {
    key: 'vi',
    path: 'vi',
    label: 'Tiếng Việt', // 越南语
    hide: false,
  },
  {
    key: 'zh-CN',
    path: 'zh-CN',
    label: '简体中文',
  },
  {
    key: 'zh-TW',
    path: 'zh-TW',
    label: '繁體中文',
  },
];

export const DEXTOOLS_MAP = {
  de: 'de',
  en: 'en',
  es: 'es',
  fr: 'fr',
  it: 'it',
  'ja-JP': 'ja',
  kr: 'kr',
  ru: 'ru',
  'uk-UA': 'uk',
  tr: 'tr',
  'zh-CN': 'cn',
  'zh-TW': 'tw',
};

export const COIN_GECKO_MAP = {
  de: 'de',
  en: 'en',
  es: 'es',
  fr: 'fr',
  it: 'it',
  'ja-JP': 'ja',
  kr: 'ko',
  ru: 'ru',
  'uk-UA': 'uk',
  tr: 'tr',
  'zh-CN': 'zh',
  'zh-TW': 'zh-TW',
  vi: 'vi',
};

export function checkKey({ en, target, targetName }: any) {
  // check intl file keys
  const enKeys = Object.keys(en);
  const targetKeys = Object.keys(target);
  let targetIndexErr = 0;
  if (enKeys.join('-') !== targetKeys.join('-')) {
    console.warn(targetName, ' trade intl error >>>>>>>');
    enKeys.forEach((key, i) => {
      if (!targetKeys.includes(key)) {
        console.warn(key);
      }
      if (targetKeys[i] !== key && !targetIndexErr) {
        targetIndexErr = i;
        console.warn(targetName, ' index', key, targetIndexErr);
      }
    });
    console.warn(`${targetName} intl error <<<<<<<`);
  }
}

export function createRes({ res, enRes }: any) {
  return Object.keys(enRes).reduce((prev, key) => {
    return {
      ...prev,
      [key]: (res as any)[key] || (enRes as any)[key],
    };
  }, {});
}

export function handleFiles(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      resolve(parseCsv(text));
    };

    reader.readAsText(file);
  });
}

function parseCsv(text: string) {
  // 将CSV文本分割成行
  const lines = text.split('\n');
  const map: any = {};
  for (let i = 0; i < lines.length; i++) {
    // 忽略空行
    if (lines[i].trim() === '') continue;
    const data = lines[i].replace('\r', '').split(',');
    const key = data[0];
    map[key] = data.slice(1).join(',');
  }
  console.log(map);
  return map;
}

// const csv: any = {};
// Object.keys(enRes).forEach((key) => {
//   if (!(deRes as any)[key]) {
//     csv[key] = {
//       en: (enRes as any)[key],
//       'zh-CN': (zhRes as any)[key],
//       'zh-TW': (twRes as any)[key],
//       de: (deRes as any)[key],
//       it: (itRes as any)[key],
//       ja: (jaRes as any)[key],
//       ru: (ruRes as any)[key],
//       tr: (trRes as any)[key],
//       uk: (ukRes as any)[key],
//     };
//   }
// });
// toCsv(csv);

const excludeKeys = ['time_before', 'doc_title_swap'];
const keys = ['meme', 'ct', 'stocks', 'swap_error', 'gift', 'turboRange'];

export function toCsv({
  enRes,
  deRes,
  jaRes,
  itRes,
  ruRes,
  trRes,
  ukRes,
  krRes,
  esRes,
  frRes,
  zhRes,
  twRes,
  viRes,
}: any) {
  const csv = buildCsvString({
    enRes,
    deRes,
    jaRes,
    itRes,
    ruRes,
    trRes,
    ukRes,
    krRes,
    esRes,
    frRes,
    zhRes,
    twRes,
    viRes,
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'trade.csv';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function buildCsvString({
  enRes,
  deRes,
  jaRes,
  itRes,
  ruRes,
  trRes,
  ukRes,
  krRes,
  esRes,
  frRes,
  zhRes,
  twRes,
  viRes,
}: any) {
  const localeOrder = [
    'en',
    'zh-CN',
    'zh-TW',
    'ja',
    'kr',
    'fr',
    'es',
    'de',
    'it',
    'ru',
    'uk',
    'tr',
    'vi',
  ] as const;

  const resMap: Record<string, any> = {
    en: enRes,
    'zh-CN': zhRes,
    'zh-TW': twRes,
    de: deRes,
    it: itRes,
    ja: jaRes,
    ru: ruRes,
    tr: trRes,
    uk: ukRes,
    kr: krRes,
    es: esRes,
    fr: frRes,
    vi: viRes,
  };

  const rows: string[] = [];
  rows.push(['key', ...localeOrder].join(', '));

  const addRow = (csvKey: string, key: string, subKey?: string) => {
    let addTo = false;
    const values = localeOrder.map((lang) => {
      const src = resMap[lang] || {};
      const raw = subKey ? src?.[key]?.[subKey] : src?.[key];
      if (lang === 'vi' && !raw) {
        addTo = true;
      }
      return componentToString(raw ?? '');
    });
    if (addTo) {
      rows.push([csvKey, ...values].join(','));
    }
  };

  for (const key of Object.keys(enRes)) {
    if (keys.includes(key)) {
      for (const key_2 of Object.keys(enRes[key])) {
        const fullKey = `${key}.${key_2}`;
        if (excludeKeys.includes(fullKey)) continue;
        addRow(fullKey, key, key_2);
      }
      continue;
    }

    if (!(viRes as any)[key]) {
      if (excludeKeys.includes(key)) continue;
      addRow(key, key);
    }
  }

  return rows.join('\n');
}

function componentToString(component: any): string {
  if (typeof component === 'string') {
    return `"${component.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
  }
  if (React.isValidElement(component)) {
    // 将React组件转换为字符串形式的JSX
    const rawString = ReactDOMServer.renderToStaticMarkup(component);
    const stringWithoutQuotes = rawString.replace(/"/g, '""');
    return `"${stringWithoutQuotes}"`;
  }
  if (typeof component === 'function') {
    const element = <>{component}</>;
    const rawString = ReactDOMServer.renderToStaticMarkup(element);
    const stringWithoutQuotes = rawString.replace(/"/g, '""');
    return `"${stringWithoutQuotes}"`;
  }
  // 其他类型的处理
  return `"${String(component)}"`;
}

export function logKeys({
  enRes,
  zhRes,
  twRes,
  jaRes,
  itRes,
  ruRes,
  trRes,
  ukRes,
  krRes,
  esRes,
  frRes,
  viRes,
  deRes,
}: any) {
  const keys = [
    'turboRange.desc_xstocks',
    'turboRange.desc_gold',
    'turboRange.desc_btc',
    'turboRange.desc_native_coin_ETH_NETWORK',
    'turboRange.legal_documentation',
    'turboRange.factsheet',
    'turboRange.audit_reports',
    'turboRange.Onesheet',
  ];

  const _res = keys.reduce((prev, key) => {
    return {
      ...prev,
      [key]: {
        'en-US': get(enRes, key),
        'zh-CN': get(zhRes, key),
        'zh-TW': get(twRes, key),
        'ja-JP': get(jaRes, key),
        it: get(itRes, key),
        ru: get(ruRes, key),
        tr: get(trRes, key),
        'uk-UA': get(ukRes, key),
        kr: get(krRes, key),
        es: get(esRes, key),
        fr: get(frRes, key),
        vi: get(viRes, key),
        de: get(deRes, key),
      },
    };
  }, {});

  console.log('res', _res);
}
