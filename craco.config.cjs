/* eslint-disable */
/* eslint-env node */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const { ProvidePlugin, DllReferencePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const whyDidYouRender = require('@welldone-software/why-did-you-render');
// Linting and type checking are only necessary as part of development and testing.
// Omit them from production builds, as they slow down the feedback loop.
const shouldLintOrTypeCheck = !isProduction;
function getCacheDirectory(cacheName) {
  // Include the trailing slash to denote that this is a directory.
  return `${path.join(__dirname, 'node_modules/.cache/', cacheName)}/`;
}

module.exports = {
  eslint: {
    enable: shouldLintOrTypeCheck,
    pluginOptions(eslintConfig) {
      return Object.assign(eslintConfig, {
        cache: true,
        cacheLocation: getCacheDirectory('eslint'),
        ignorePath: '.gitignore',
        // Use our own eslint/plugins/config, as overrides interfere with caching.
        // This ensures that `yarn start` and `yarn lint` share one cache.
        eslintPath: require.resolve('eslint'),
        resolvePluginsRelativeTo: null,
        baseConfig: null,
      });
    },
  },
  typescript: {
    enableTypeChecking: shouldLintOrTypeCheck,
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    /* ... */
    devServerConfig.client.overlay = false;
    return devServerConfig;
  },
  webpack: {
    alias: {
      business: process.cwd(),
      src: path.resolve('src'),
      public: path.resolve('public'),
      js: path.resolve('src'),
      state: path.resolve('src/state'),
      constants: path.resolve('src/constants'),
      components: path.resolve('src/components'),
      imgs: path.resolve('src/imgs'),
      style: path.resolve('src/style'),
    },
    plugins: {
      add: [
        // Webpack 5 does not polyfill node globals, so we do so for those necessary:
        new CaseSensitivePathsPlugin(),
        new ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js',
        }),
        new CopyWebpackPlugin({
          patterns: [{ from: 'src/tradingView', to: 'tradingView' }],
        }),
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
        new RetryChunkLoadPlugin({
          retryDelay: 2000,
          maxRetries: 3,
        }),
        // new BundleAnalyzerPlugin({
        //   analyzerMode: 'static',
        //   openAnalyzer: false,
        // }),
      ],
      remove: ['CaseSensitivePathsPlugin', 'IgnorePlugin'],
    },
    configure: (webpackConfig) => {
      webpackConfig.devtool = isProduction ? false : 'source-map';
      // For UED public deploys (Vercel etc.) we keep the dev-mode
      // public/index.html so the API URLs in window._config are baked
      // in. The index_pro.html template is designed for docker runtime
      // substitution via docker/fixEnv.js which we don't run on Vercel.
      const isPublicDeployBuild = process.env.REACT_APP_PUBLIC_DEPLOY === '1';
      webpackConfig.plugins = webpackConfig.plugins.map((plugin) => {
        if (
          plugin instanceof HtmlWebpackPlugin &&
          isProduction &&
          !isPublicDeployBuild
        ) {
          plugin.userOptions.template = path.join(
            process.cwd(),
            'public/index_pro.html'
          );
          plugin.userOptions.minify = false;
        }
        return plugin;
      });


      // DllReferencePlugin expects vendor DLL loaded via <script> in
      // index_pro.html. For public deploys we use index.html (no DLL
      // script) so skip it entirely to avoid "v1_dll is not defined".
      if (!shouldLintOrTypeCheck && !isPublicDeployBuild) {
        webpackConfig.plugins = webpackConfig.plugins.concat(
          new DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require('./public/dll/trade-manifest.json'),
          })
        )
      }

      const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
      const devPublicUrlOrPath = `http://localhost:${DEFAULT_PORT}/`;

      // For UED public deploys (Vercel etc.), use a real `/` publicPath so
      // assets are served directly. The `vvvvv/` placeholder is only useful
      // when docker/fixEnv.js does runtime substitution.
      const isPublicDeploy = process.env.REACT_APP_PUBLIC_DEPLOY === '1';
      const prodPublicPath = isPublicDeploy ? '/' : '/';

      webpackConfig.output = Object.assign(webpackConfig.output, {
        publicPath: isProduction ? prodPublicPath : devPublicUrlOrPath,
        library: `trade-[name]`,
        libraryTarget: 'umd',
      });

      // Configure webpack resolution:
      webpackConfig.resolve = Object.assign(webpackConfig.resolve, {
        // Webpack 5 does not resolve node modules, so we do so for those necessary:
        fallback: {
          fs: false,
          path: require.resolve('path-browserify'),
          assert: require.resolve('assert'),
          util: require.resolve('util/'),
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          os: require.resolve('os-browserify/browser'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          buffer: require.resolve('buffer/'),
          events: require.resolve('events/'),
          url: require.resolve('url/'),
        },
      });

      const chunks = {
        splitChunks: {
          maxSize: 5 * 1024 * 1024,
          chunks: 'all',
        },
      };

      webpackConfig.optimization = Object.assign(
        webpackConfig.optimization,
        isProduction ? chunks : {}
      );

      // Configure webpack caching:
      webpackConfig.cache = Object.assign(webpackConfig.cache, {
        cacheDirectory: getCacheDirectory('webpack'),
      });

      webpackConfig.ignoreWarnings = [/Failed to parse source map/];

      webpackConfig.module.rules = [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          use: {
            loader: 'babel-loader',
          },
          include: [path.resolve('src')],
          exclude: [/node_modules/, path.resolve('src/tradingView')],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../',
              },
            },
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../',
              },
            },
            'css-loader',
            {
              loader: 'less-loader',
            },
          ],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          use: {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: 'static/images/[name].[hash:8].[ext]',
            },
          },
        },

        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'static/fonts/[name].[hash:8].[ext]',
            },
          },
        },
        {
          test: /\.(mp3|ogg|wav|svg|mp4)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        },
      ];
      return webpackConfig;
    },
  },
};
