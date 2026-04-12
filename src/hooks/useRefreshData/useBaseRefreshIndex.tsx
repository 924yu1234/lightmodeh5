import { useEffect, useState } from 'react';
import { useDocumentVisibility, usePrevious } from '@mantine/hooks';

import { useUserWebSocket } from 'src/providers/userWebsocket/useUserWebsocket';
import { ReadyState, useScoket } from 'src/providers/useWebsocket';
import { useRefreshIndexForNetworkRecover } from 'src/state/application/hooks';

// 网络或者Tab切换
export default function useBaseRefreshIndex() {
  // 页面可见状态
  const [index, setIndex] = useState(0);
  const documentState = useDocumentVisibility();
  const preDocumentState = usePrevious(documentState);
  // 网络状态 0 => 1++
  const recoverIndex = useRefreshIndexForNetworkRecover();

  useEffect(() => {
    if (preDocumentState === 'hidden' && documentState !== 'hidden') {
      setIndex((pre) => pre + 1);
    }
    if (recoverIndex) {
      setIndex((pre) => pre + 1);
    }
  }, [preDocumentState, documentState, recoverIndex]);

  return index;
}

// ws连接后断开需要接口刷新所有推送的数据
export function useWsRefreshIndex() {
  const [index, setIndex] = useState(0);
  const { readyState } = useScoket();
  const preReadyState = usePrevious(readyState);
  useEffect(() => {
    if (preReadyState === ReadyState.Open && readyState !== ReadyState.Open) {
      setIndex((pre) => pre + 1);
    }
  }, [preReadyState, readyState]);

  return index;
}

// ws连接后断开需要接口刷新所有推送的数据
export function useUserWsRefreshIndex() {
  const [index, setIndex] = useState(0);
  const { readyState } = useUserWebSocket();
  const preReadyState = usePrevious(readyState);
  useEffect(() => {
    if (preReadyState === ReadyState.Open && readyState !== ReadyState.Open) {
      setIndex((pre) => pre + 1);
    }
  }, [preReadyState, readyState]);

  return index;
}
