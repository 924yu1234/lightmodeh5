import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { createManagedTokenKey } from 'src/hooks/useAssets';
import InfiniteList from 'src/mobiles/components/InfiniteList';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';

import Spin from 'js/components/Spin';

import Asset from './asset';
import QuickActionLayer from './quickActionLayer';

export default function AssetsList({ loading, data }) {
  const pageSize = 20;
  const [current, setCurrent] = useState(1);
  const [activeToken, setActiveToken] = useState(null);
  const [activeRect, setActiveRect] = useState(null);
  const total = data.length;
  const showModal = useShowModal();
  const hasNext = total > current * pageSize;
  async function loadMore(page) {
    setCurrent(page);
  }
  const showData = data.slice(0, current * pageSize);
  const activeTokenKey = useMemo(() => {
    return activeToken ? createManagedTokenKey(activeToken) : '';
  }, [activeToken]);

  const closeQuickActions = useCallback(() => {
    setActiveToken(null);
    setActiveRect(null);
  }, []);

  const handleLongPress = useCallback((token, rect) => {
    setActiveToken(token);
    setActiveRect(rect);
  }, []);

  const handleRemove = useCallback(() => {
    if (!activeToken) return;
    const token = activeToken;
    closeQuickActions();
    showModal({
      modal: ModalKeys.manageTokensRemoveConfirm,
      token,
    });
  }, [activeToken, closeQuickActions, showModal]);

  useEffect(() => {
    if (!activeTokenKey) return;
    const tokenStillVisible = showData.some(
      (item) => createManagedTokenKey(item) === activeTokenKey
    );
    if (!tokenStillVisible) {
      closeQuickActions();
    }
  }, [activeTokenKey, closeQuickActions, showData]);

  useEffect(() => {
    if (!activeToken) return undefined;
    const scrollTarget = document.getElementById('mobileBalanceTpl');
    const handleDismiss = () => {
      closeQuickActions();
    };
    scrollTarget?.addEventListener('scroll', handleDismiss, { passive: true });
    window.addEventListener('resize', handleDismiss);
    return () => {
      scrollTarget?.removeEventListener('scroll', handleDismiss);
      window.removeEventListener('resize', handleDismiss);
    };
  }, [activeToken, closeQuickActions]);

  const overlay =
    activeToken && activeRect && document.body
      ? createPortal(
          <QuickActionLayer
            token={activeToken}
            rect={activeRect}
            onClose={closeQuickActions}
            onRemove={handleRemove}
          />,
          document.body
        )
      : null;

  return (
    <Spin spinning={loading}>
      <InfiniteList
        dataLength={showData.length}
        next={() => {
          loadMore(current + 1);
        }}
        pullDownToRefresh
        refreshFunction={() => {}}
        hasMore={hasNext}
        scrollableTarget="mobileBalanceTpl"
      >
        {showData.map((d) => {
          const tokenKey = createManagedTokenKey(d);
          return (
            <Asset
              token={d}
              key={tokenKey}
              onLongPress={handleLongPress}
              hidden={tokenKey === activeTokenKey}
            />
          );
        })}
      </InfiniteList>
      {overlay}
    </Spin>
  );
}

AssetsList.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
};

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
`;
