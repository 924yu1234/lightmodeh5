import { lazy } from 'react';

// 路由
export default [
  {
    path: '/',
    element: lazy(() => import(/* webpackChunkName: "home" */ 'js/apps/home')),
  },
  {
    path: '/home',
    element: lazy(() => import(/* webpackChunkName: "home" */ 'js/apps/home')),
  },
  {
    path: '/swap',
    element: lazy(() => import(/* webpackChunkName: "swap" */ 'js/apps/swap')),
  },
  {
    path: '/swap/:quote/:base',
    element: lazy(() => import(/* webpackChunkName: "swap" */ 'js/apps/swap')),
  },
  {
    path: '/earn',
    element: lazy(() =>
      import(/* webpackChunkName: "earn" */ 'js/apps/earn/list')
    ),
  },
  {
    path: '/earn/:id',
    element: lazy(() =>
      import(/* webpackChunkName: "earnDetail" */ 'js/apps/earn/detail')
    ),
  },
  {
    path: '/earn/rewards',
    element: lazy(() =>
      import(/* webpackChunkName: "earnRewards" */ 'js/apps/earn/rewards')
    ),
  },
  {
    path: '/simple-earn',
    element: lazy(() =>
      import(/* webpackChunkName: "earn" */ 'js/apps/earn/list')
    ),
  },
  {
    path: '/simple-earn/:id',
    element: lazy(() =>
      import(/* webpackChunkName: "earnDetail" */ 'js/apps/earn/detail')
    ),
  },
  {
    path: '/simple-earn/rewards',
    element: lazy(() =>
      import(/* webpackChunkName: "earnRewards" */ 'js/apps/earn/rewards')
    ),
  },
  {
    path: '/account/*',
    element: lazy(() =>
      import(/* webpackChunkName: "account" */ 'js/apps/account')
    ),
  },
  {
    path: '/icons',
    element: lazy(() =>
      import(/* webpackChunkName: "icons" */ 'js/apps/icons')
    ),
  },
  {
    path: '/terms',
    element: lazy(() =>
      import(/* webpackChunkName: "termsOfService" */ 'js/apps/termsOfService')
    ),
  },
  {
    path: '/download',
    element: lazy(() =>
      import(/* webpackChunkName: "download" */ 'js/mobiles/download')
    ),
  },
  {
    path: '/referral',
    redirect: '/account/referral',
  },
  {
    path: '/stocks',
    element: lazy(() =>
      import(/* webpackChunkName: "xstocks" */ 'js/apps/stocks')
    ),
  },
  {
    path: '/stocks/xstocks',
    element: lazy(() =>
      import(/* webpackChunkName: "xstocks" */ 'js/apps/stocks')
    ),
  },
  {
    path: '/stocks/ondo',
    element: lazy(() =>
      import(/* webpackChunkName: "ondo" */ 'js/apps/stocks')
    ),
  },
  {
    path: '/stocks/:code',
    element: lazy(() =>
      import(/* webpackChunkName: "xstocksDetail" */ 'js/apps/xstocks/detail')
    ),
  },
  {
    path: '/stocks/xstocks/:code',
    element: lazy(() =>
      import(/* webpackChunkName: "xstocksDetail" */ 'js/apps/xstocks/detail')
    ),
  },
  {
    path: '/stocks/ondo/:code',
    element: lazy(() =>
      import(/* webpackChunkName: "ondoDetail" */ 'js/apps/ondo/detail')
    ),
  },
  {
    path: '/gift/:id',
    element: lazy(() =>
      import(/* webpackChunkName: "giftBox" */ 'src/apps/gift/dashboard')
    ),
  },
  {
    path: '/gift/detail/:id',
    element: lazy(() =>
      import(/* webpackChunkName: "giftBox" */ 'src/apps/gift/detail')
    ),
  },
  {
    path: '/turbo-range',
    element: lazy(() =>
      import(
        /* webpackChunkName: "turboRange" */ 'src/apps/turboRange/dashboard'
      )
    ),
  },
  {
    path: '/turbo-range/positions',
    redirect: '/turbo-range',
  },
  {
    path: '/turbo-range/invest/:poolAddress',
    element: lazy(() =>
      import(
        /* webpackChunkName: "turboRangeInvest" */ 'src/apps/turboRange/invest'
      )
    ),
  },
  {
    path: '/card/:cardId',
    element: lazy(() =>
      import(/* webpackChunkName: "card" */ 'src/apps/card/detail')
    ),
  },
  {
    path: '/card/:cardId/:cardName',
    element: lazy(() =>
      import(/* webpackChunkName: "card" */ 'src/apps/card/detail')
    ),
  },
  {
    path: '/invite/:code',
    element: lazy(() =>
      import(/* webpackChunkName: "invite" */ 'src/apps/invite')
    ),
  },
];
