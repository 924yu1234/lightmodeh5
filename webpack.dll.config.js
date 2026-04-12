const path = require('path');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// Modify the 'name' (e.g., from v1_dll to v2_dll) every time you change the vendor dependencies
// or when there is a version upgrade in dependencies that changes the contenthash
// change index_pro.html import
module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-persist',
      'history',
      'bignumber.js',
      'lodash',
      '@mantine/hooks',
      'react-copy-to-clipboard',
      'rc-input',
      'styled-components',
    ],
  },
  output: {
    path: path.join(__dirname, 'public', 'dll'),
    filename: '[name].[contenthash:8].dll.js',
    library: 'v1_dll',
    libraryTarget: 'window',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'v1_dll',
      path: path.join(__dirname, 'public', 'dll', 'trade-manifest.json'),
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    // }),
  ],
};
