/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

require('@babel/register')({
  babelrc: false,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  ignore: [/node_modules/],
  presets: [
    ['@babel/preset-env', { modules: 'commonjs' }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
});

const { buildCsvString } = require('../src/locals/intlUtils');
const de = require('../src/locals/de').default;
const deComp = require('../src/locals/de-Comp').default;
const en = require('../src/locals/en').default;
const enComp = require('../src/locals/en-Comp').default;
const es = require('../src/locals/es').default;
const esComp = require('../src/locals/es-Comp').default;
const fr = require('../src/locals/fr').default;
const frComp = require('../src/locals/fr-Comp').default;
const it = require('../src/locals/it').default;
const itComp = require('../src/locals/it-Comp').default;
const ja = require('../src/locals/ja-JP').default;
const jaComp = require('../src/locals/ja-JP-Comp').default;
const kr = require('../src/locals/kr').default;
const krComp = require('../src/locals/kr-Comp').default;
const ru = require('../src/locals/ru').default;
const ruComp = require('../src/locals/ru-Comp').default;
const tr = require('../src/locals/tr').default;
const trComp = require('../src/locals/tr-Comp').default;
const ukUA = require('../src/locals/uk-UA').default;
const ukUAComp = require('../src/locals/uk-UA-Comp').default;
const vi = require('../src/locals/vi').default;
const viComp = require('../src/locals/vi-Comp').default;
const zhCN = require('../src/locals/zh-CN').default;
const zhCNComp = require('../src/locals/zh-CN-Comp').default;
const zhTW = require('../src/locals/zh-TW').default;
const zhTWComp = require('../src/locals/zh-TW-Comp').default;

const outputPathArg = process.argv[2];
const outputPath = outputPathArg
  ? path.resolve(process.cwd(), outputPathArg)
  : path.resolve(require('os').homedir(), `Downloads/trade_${Date.now()}.csv`);

const enRes = { ...en, ...enComp };
const zhRes = { ...zhCN, ...zhCNComp };
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

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, csv, 'utf8');

console.log(`CSV exported: ${outputPath}`);
