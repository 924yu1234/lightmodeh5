import { lazy } from 'react';

// 路由
export default [
  {
    path: '/',
    element: lazy(() =>
      import(/* webpackChunkName: "h5_home" */ 'src/h5/menus')
    ),
  },
  {
    path: '/menus',
    element: lazy(() =>
      import(/* webpackChunkName: "h5_home" */ 'src/h5/menus')
    ),
  },
  {
    path: '/pairInfo/:id',
    element: lazy(() =>
      import(/* webpackChunkName: "h5_tokenInfo" */ 'src/h5/pairInfo')
    ),
  },
  {
    path: '/syncPrivy',
    element: lazy(() =>
      import(/* webpackChunkName: "m_syncPrivy" */ 'src/h5/syncPrivy')
    ),
  },
  {
    path: '/earn',
    element: lazy(() =>
      import(/* webpackChunkName: "earn" */ 'src/mobiles/earn/list')
    ),
  },
  {
    path: '/earn/:id',
    element: lazy(() =>
      import(/* webpackChunkName: "earnDetail" */ 'src/mobiles/earn/detail')
    ),
  },
  {
    path: '/earn/rewards',
    element: lazy(() =>
      import(/* webpackChunkName: "earnRewards" */ 'src/mobiles/earn/rewards')
    ),
  },
  {
    path: '/simple-earn',
    element: lazy(() =>
      import(/* webpackChunkName: "earn" */ 'src/mobiles/earn/list')
    ),
  },
  {
    path: '/simple-earn/:id',
    element: lazy(() =>
      import(/* webpackChunkName: "earnDetail" */ 'src/mobiles/earn/detail')
    ),
  },
  {
    path: '/simple-earn/rewards',
    element: lazy(() =>
      import(/* webpackChunkName: "earnRewards" */ 'src/mobiles/earn/rewards')
    ),
  },

  {
    path: '/terms',
    element: lazy(() =>
      import(
        /* webpackChunkName: "termsOfService" */ 'js/mobiles/termsOfService'
      )
    ),
  },
  {
    path: '/account/history',
    element: lazy(() =>
      import(
        /* webpackChunkName: "m_account_history" */ 'js/mobiles/account/history'
      )
    ),
  },
  {
    path: '/account/history/:tab',
    element: lazy(() =>
      import(
        /* webpackChunkName: "m_account_history" */ 'js/mobiles/account/history'
      )
    ),
  },
  {
    path: '/referral',
    element: lazy(() =>
      import(/* webpackChunkName: "referral" */ 'src/mobiles/referral')
    ),
  },
  {
    path: '/swap/info/:quote/:base',
    element: lazy(() =>
      import(/* webpackChunkName: "m_swapInfo" */ 'js/mobiles/swapInfo')
    ),
  },
  {
    path: '/stocks',
    element: lazy(() =>
      import(/* webpackChunkName: "xstocks" */ 'src/mobiles/stocks')
    ),
  },
  {
    path: '/stocks/xstocks',
    element: lazy(() =>
      import(/* webpackChunkName: "xstocks" */ 'src/mobiles/stocks')
    ),
  },
  {
    path: '/stocks/ondo',
    element: lazy(() =>
      import(/* webpackChunkName: "ondo" */ 'src/mobiles/stocks')
    ),
  },
  {
    path: '/stocks/:code',
    element: lazy(() =>
      import(
        /* webpackChunkName: "xstocksDetail" */ 'js/mobiles/xstocks/detail'
      )
    ),
  },
  {
    path: '/stocks/xstocks/:code',
    element: lazy(() =>
      import(
        /* webpackChunkName: "xstocksDetail" */ 'js/mobiles/xstocks/detail'
      )
    ),
  },
  {
    path: '/stocks/ondo/:code',
    element: lazy(() =>
      import(/* webpackChunkName: "ondoDetail" */ 'js/mobiles/ondo/detail')
    ),
  },
  {
    path: '/gift/:id',
    element: lazy(() =>
      import(
        /* webpackChunkName: "giftDashboard_h5" */ 'src/mobiles/gift/dashboard'
      )
    ),
  },
  {
    path: '/gift/detail/:id',
    element: lazy(() =>
      import(
        /* webpackChunkName: "giftDashboard_h5" */ 'src/mobiles/gift/detail'
      )
    ),
  },
  {
    path: '/turbo-range',
    element: lazy(() =>
      import(
        /* webpackChunkName: "turboRange" */ 'src/mobiles/turboRange/dashboard'
      )
    ),
  },
  {
    path: '/turbo-range/positions',
    element: lazy(() =>
      import(
        /* webpackChunkName: "turboRangePositions" */ 'src/mobiles/turboRange/positions'
      )
    ),
  },
  {
    path: '/turbo-range/info/:poolAddress',
    element: lazy(() =>
      import(
        /* webpackChunkName: "turboRangeInfo" */ 'src/mobiles/turboRangeInfo'
      )
    ),
  },
  {
    path: '/turbo-range/invest/:poolAddress',
    element: lazy(() =>
      import(
        /* webpackChunkName: "turboRangeDeposit" */ 'src/mobiles/turboRange/invest'
      )
    ),
  },
  {
    path: '/bridge-usdc',
    element: lazy(() =>
      import(/* webpackChunkName: "bridgeUsdc" */ 'src/mobiles/bridgeUsdc')
    ),
  },
  {
    path: '/card/:cardId/:cardName',
    element: lazy(() =>
      import(/* webpackChunkName: "cardDetail" */ 'src/h5/card')
    ),
  },
  {
    path: '/check_referral',
    element: lazy(() =>
      import(/* webpackChunkName: "checkReferral" */ 'src/h5/checkReferral')
    ),
  },
  {
    path: '/invite/:code',
    element: lazy(() =>
      import(/* webpackChunkName: "invite" */ 'src/h5/invite')
    ),
  },
  {
    path: '/clear',
    element: lazy(() => import(/* webpackChunkName: "white" */ 'src/h5/clear')),
  },
  {
    path: '/feedback',
    element: lazy(() =>
      import(/* webpackChunkName: "feedback" */ 'src/h5/feedback')
    ),
  },
  {
    path: '/private-client-desk',
    element: lazy(() =>
      import(
        /* webpackChunkName: "privateClientDesk_h5" */ 'src/mobiles/privateClientDesk'
      )
    ),
  },
  {
    path: '/clear',
    element: lazy(() => import(/* webpackChunkName: "white" */ 'src/h5/clear')),
  },
];
