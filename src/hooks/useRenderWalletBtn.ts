import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';

import { registerSwapSubmitHandler } from 'src/bridge/walletBridge';
import { TradeBtnParams } from 'src/constants/interface';
import { useSetLocale } from 'src/locals';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useBannerMessage } from 'src/state/notification/hooks';

import useWallet from 'js/providers/useWallet';
import { useNeedHideWalletTradeBtn } from 'js/state/application/hooks';

import useIsWindowVisible from './useIsWindowVisible';
import useBaseRefreshIndex from './useRefreshData/useBaseRefreshIndex';

let timer: any;

export default function useRenderWalletBtn({
  disabled,
  ref,
  baseToken,
  orderDir,
  submitOrder,
  scrollRootId = 'appContainer',
  checkHideBtnByBtnRect,
  loading,
  type = 'trade',
}: any) {
  const { renderSwapBtn } = useWallet();
  const [scroll, setScroll] = useState<{ top: number }>({ top: 0 });
  const [index, setIndex] = useState(0);
  const { width, height } = useViewportSize();
  const { hideWalletBtn, hideTag } = useNeedHideWalletTradeBtn();
  const { locale } = useSetLocale();
  const dexAccount = useDexAccount();
  const bannerMessage = useBannerMessage();
  const refreshIndex = useBaseRefreshIndex();
  const needHide = disabled;
  const windowVisible = useIsWindowVisible();
  const contextIdRef = useRef(
    `swap-btn-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  );

  const rect = useMemo(() => {
    if (!ref?.current) return undefined;
    return ref?.current?.getBoundingClientRect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    width,
    height,
    ref,
    locale,
    scroll,
    windowVisible,
    hideWalletBtn,
    dexAccount?.hasUnlocked,
    dexAccount?.hasSyncDA,
    dexAccount?.hasAccessToken,
    disabled,
    index,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setIndex((pre) => pre + 1);
    }, 50);
  }, [
    locale,
    hideWalletBtn,
    dexAccount?.hasUnlocked,
    dexAccount?.hasSyncDA,
    dexAccount?.hasAccessToken,
    disabled,
    bannerMessage,
    refreshIndex,
  ]);

  const hideWalletBtnByRect = useMemo(() => {
    return checkHideBtnByBtnRect && checkHideBtnByBtnRect(rect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect, checkHideBtnByBtnRect]);

  const doRenderBtn = useCallback(
    (params: TradeBtnParams) => {
      if (type === 'swap' && renderSwapBtn) {
        renderSwapBtn(params);
      }
    },
    [renderSwapBtn, type]
  );

  const renderBtn = useCallback(() => {
    if (!doRenderBtn) {
      return () => {};
    }
    if (!rect || hideWalletBtn || hideWalletBtnByRect || needHide) {
      doRenderBtn({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        baseToken,
        type: orderDir,
        loading: false,
      });
      return () => {};
    }
    doRenderBtn({
      contextId: contextIdRef.current,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      type: orderDir,
      baseToken,
      loading,
    });
    return () => {
      doRenderBtn({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        baseToken,
        type: orderDir,
        loading: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hideWalletBtn,
    orderDir,
    baseToken,
    submitOrder,
    hideWalletBtnByRect,
    rect,
    loading,
    disabled,
    needHide,
  ]);

  useEffect(() => {
    const unregister = registerSwapSubmitHandler(
      contextIdRef.current,
      submitOrder
    );
    return () => {
      unregister();
    };
  }, [submitOrder]);

  useEffect(() => {
    return () => {
      doRenderBtn({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        baseToken,
        type: orderDir,
        loading: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return renderBtn();
  }, [hideWalletBtn, doRenderBtn, renderBtn, width, height]);

  const scrollFn = useCallback(
    (e: any) => {
      doRenderBtn({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        type: '',
        baseToken: undefined,
        loading: false,
      });
      clearTimeout(timer);
      const scrollTop = e.currentTarget.scrollTop;
      timer = setTimeout(() => {
        setScroll({
          top: scrollTop,
        });
      }, 100);
    },
    [doRenderBtn]
  );

  useEffect(() => {
    const scrollRoot = document.getElementById(scrollRootId);
    if (!scrollRoot) return () => {};
    scrollRoot.addEventListener('scroll', scrollFn, false);
    return () => {
      scrollRoot.removeEventListener('scroll', scrollFn);
    };
  }, [scrollRootId, scrollFn]);

  const log = `${!rect} || ${hideWalletBtn} || ${hideWalletBtnByRect} || ${needHide} | ${hideTag}`;

  return {
    isHideWalletBtn: log,
    hideWalletBtnByRect,
  };
}
