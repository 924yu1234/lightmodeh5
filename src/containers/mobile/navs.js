import { lazy } from 'react';

// 路由
export default [
  {
    path: '/',
    element: lazy(() =>
      import(/* webpackChunkName: "m_home" */ 'js/mobiles/home')
    ),
  },
  {
    path: '/home',
    element: lazy(() =>
      import(/* webpackChunkName: "m_home" */ 'js/mobiles/home')
    ),
  },
  {
    path: '/account/*',
    element: lazy(() =>
      import(/* webpackChunkName: "m_account" */ 'js/mobiles/account')
    ),
  },
  {
    path: '/referral',
    element: lazy(() =>
      import(/* webpackChunkName: "referral" */ 'src/mobiles/referral')
    ),
  },
  {
    path: '/account/referral',
    redirect: '/referral',
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
    path: '/swap',
    element: lazy(() =>
      import(/* webpackChunkName: "m_swap" */ 'src/mobiles/swap')
    ),
  },
  {
    path: '/swap/info/:quote/:base',
    element: lazy(() =>
      import(/* webpackChunkName: "m_swapInfo" */ 'js/mobiles/swapInfo')
    ),
  },
  {
    path: '/swap/:quote/:base',
    element: lazy(() =>
      import(/* webpackChunkName: "m_swap" */ 'src/mobiles/swap')
    ),
  },
  {
    path: '/download',
    element: lazy(() =>
      import(/* webpackChunkName: "m_download" */ 'src/mobiles/download')
    ),
  },
  {
    path: '/download/testflight',
    element: lazy(() =>
      import(
        /* webpackChunkName: "m_downloadTestflight" */ 'src/mobiles/download/testflight'
      )
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
    path: '/search',
    element: lazy(() =>
      import(/* webpackChunkName: "m_search" */ 'src/mobiles/search')
    ),
  },
  {
    path: '/stocks',
    element: lazy(() =>
      import(/* webpackChunkName: "m_xstocks" */ 'src/mobiles/stocks')
    ),
  },
  {
    path: '/stocks/xstocks',
    element: lazy(() =>
      import(/* webpackChunkName: "m_xstocks" */ 'src/mobiles/stocks')
    ),
  },
  {
    path: '/stocks/ondo',
    element: lazy(() =>
      import(/* webpackChunkName: "m_xstocks" */ 'src/mobiles/stocks')
    ),
  },
  {
    path: '/stocks/:code',
    element: lazy(() =>
      import(
        /* webpackChunkName: "m_xstocksDetail" */ 'src/mobiles/xstocks/detail'
      )
    ),
  },
  {
    path: '/stocks/xstocks/:code',
    element: lazy(() =>
      import(
        /* webpackChunkName: "m_xstocksDetail" */ 'src/mobiles/xstocks/detail'
      )
    ),
  },
  {
    path: '/stocks/ondo/:code',
    element: lazy(() =>
      import(/* webpackChunkName: "m_ondoDetail" */ 'src/mobiles/ondo/detail')
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
    path: '/card/:cardId',
    element: lazy(() =>
      import(/* webpackChunkName: "cardDetail" */ 'src/mobiles/card/detail')
    ),
  },
  {
    path: '/card/:cardId/:cardName',
    element: lazy(() =>
      import(/* webpackChunkName: "cardDetail" */ 'src/mobiles/card/detail')
    ),
  },
  {
    path: '/invite/:code',
    element: lazy(() =>
      import(/* webpackChunkName: "invite" */ 'src/mobiles/invite')
    ),
  },
  {
    path: '/private-client-desk',
    element: lazy(() =>
      import(
        /* webpackChunkName: "privateClientDesk_mobile" */ 'src/mobiles/privateClientDesk'
      )
    ),
  },
];
