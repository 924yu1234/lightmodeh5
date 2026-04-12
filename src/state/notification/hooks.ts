import { useCallback, useMemo } from 'react';
import { last } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { useWalletWeb3 } from 'src/providers/useWallet';
import { compareVersions } from 'src/utils/numberUtils';

import { AppState } from '..';
import { useInfo, useShowModal } from '../application/hooks';
import { ModalKeys } from '../application/reducer';
import { useDexAccount } from '../dexAccount/hooks';
import { BannerMessage, changeUserInterviewConditions } from './reducer';

export const pages = [
  {
    path: '/trade',
    name: 'Trade',
    isMobile: false,
    index: 0,
  },
  {
    path: '/grid',
    name: 'Grid Strategy',
    isMobile: false,
    index: 1,
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    isMobile: false,
    index: 3,
  },
  {
    path: '/account',
    name: 'Asset',
    isMobile: false,
    index: 2,
  },

  {
    isAppDomain: true,
    path: '/home',
    name: 'Home',
    isMobile: false,
    index: 4,
  },
  {
    isAppDomain: true,
    path: '/swap',
    name: 'Swap',
    isMobile: false,
    index: 5,
  },
  {
    isAppDomain: true,
    path: '/earn',
    name: 'Earn',
    isMobile: false,
    index: 6,
  },
  {
    isAppDomain: true,
    path: '/account',
    name: 'Asset',
    isMobile: false,
    index: 7,
  },

  // 新增页面往中间添加
  {
    isAppDomain: true,
    path: '/home',
    name: 'HOME',
    isMobile: true,
    index: 13,
  },
  {
    isAppDomain: true,
    path: '/swap',
    name: 'Swap',
    isMobile: true,
    index: 14,
  },
  {
    isAppDomain: true,
    path: '/account/balance',
    name: 'Asset',
    isMobile: true,
    index: 15,
  },
  {
    path: '/home',
    name: 'HOME',
    isMobile: true,
    index: 16,
  },
  {
    path: '/trade',
    name: 'Trade',
    isMobile: true,
    index: 17,
  },
  // {
  //   path: '/advanced',
  //   name: 'Advanced',
  //   isMobile: true,
  //   index: 18,
  // },
  {
    path: '/account/balance',
    name: 'Asset',
    isMobile: true,
    index: 19,
  },
  // {
  //   path: '/swap',
  //   name: 'Swap',
  //   isMobile: true,
  //   index: 20,
  // },
];

export function useFillterServerMessages() {
  const messages = useSelector(
    (state: AppState) => state.notification?.bannerMessages
  );
  const info = useInfo();
  const releaseVersion = info?.releaseVersion;
  const closedBanner = useSelector(
    (state: AppState) => state.user?.closedBanner
  );
  const { account } = useWalletWeb3();

  const fixedMessages = useFixedBannerMessages();

  return useMemo(() => {
    const cur = Date.now();
    return messages.concat(fixedMessages).filter((message: BannerMessage) => {
      const closed = (closedBanner as any)[message.id];

      if (closed && !message.show_after_close) return false;

      if (
        closed &&
        message.show_after_close &&
        message.show_after_close + closed.time > cur
      ) {
        return false;
      }

      if (message.show_after_connect && !account) return false;

      if (
        !pages.some((p) => p.isAppDomain && message.show_page[p.index] === '1')
      ) {
        return false;
      }

      return (
        message.start_time <= cur &&
        message.end_time >= cur &&
        releaseVersion &&
        (!message.start_version ||
          compareVersions(releaseVersion, message.start_version) >= 0) &&
        (!message.end_version ||
          compareVersions(message.end_version, releaseVersion) >= 0)
      );
    });
  }, [messages, releaseVersion, closedBanner, fixedMessages, account]);
}

const userInterview = 'userInterview';

export function useFixedBannerMessages() {
  const dexAccount = useDexAccount();
  return useMemo(() => {
    if (!dexAccount?.accountId) {
      return [];
    }
    return [
      {
        id: 111111,
        key: 'orderbook',
        i18n: {
          'en-US':
            'Discover our upgraded Order Book experience at <a href="https://orderbook.degate.com" target="_blank">orderbook.degate.com</a>',
        },
        end_time: 1748707200000,
        start_time: 1747411200000,
        start_version: '1.0.0.0',
        end_version: '2.0.0.0',
        show_page: '000011110000011100000',
        show_after_close: 259200000,
        show_after_connect: true,
        is_html: true,
        is_closeable: true,
      },
    ];
  }, [dexAccount]);
}

export function useBannerMessage(): BannerMessage | undefined {
  const messages = useFillterServerMessages();
  return useMemo(() => {
    const showBanner = last(messages.filter((d) => d.key !== userInterview));
    if (!showBanner) return undefined;
    return showBanner;
  }, [messages]);
}

export function useCheckAndShowUserInterview() {
  const flag = useUserInterviewFlag();
  const messages = useFillterServerMessages();
  const showModal = useShowModal();
  // 满足条件后下次进入页面显示，flag不作为deps
  return useCallback(() => {
    if (flag) {
      const interview = messages.find((d) => d.key === userInterview);
      if (interview) {
        showModal({
          modal: ModalKeys.tips_userInterview,
          bannerMessage: interview,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
}

export function useUserInterviewFlag() {
  const conditions = useSelector(
    (state: AppState) => state.notification?.userInterviewConditions
  );

  return useMemo(() => {
    return conditions.matched;
  }, [conditions]);
}

// 成功登陆3次后再判断下单后显示
export function useChangeUserInterviewConditions() {
  const dispatch = useDispatch();
  const conditions = useSelector(
    (state: AppState) => state.notification?.userInterviewConditions
  );

  return useCallback(
    ({
      loginSuccess,
      createOrderSuccess,
    }: {
      loginSuccess?: boolean;
      createOrderSuccess?: boolean;
    } = {}) => {
      if (conditions.matched) return;
      if (conditions.loginedTimes > 2 && createOrderSuccess) {
        dispatch(
          changeUserInterviewConditions({
            loginedTimes: conditions.loginedTimes + 1,
            matched: true,
          })
        );
      }
      if (loginSuccess) {
        dispatch(
          changeUserInterviewConditions({
            loginedTimes: conditions.loginedTimes + 1,
          })
        );
      }
    },
    [dispatch, conditions]
  );
}
