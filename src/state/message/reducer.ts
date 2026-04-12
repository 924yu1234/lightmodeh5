import { createSlice } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';

export interface AssetMessages {
  loading: boolean;
  list: any[];
  current: 1;
  hasNext: boolean;
  queryEndTime?: number;
  queryStartTime?: number;
  unread: number;
  syncIn5S: false;
}

export interface OperationMessage {
  id: number;
  title: string;
  content: string;
  startTime: number;
  endTime: number;
  readed: boolean;
  is_read: boolean; // api返回
  url?: string;
  show_prompt?: boolean;
}

export interface OperationMessages {
  loading: boolean;
  list: OperationMessage[];
  total: number;
}
export interface MessageState {
  assetMessages: AssetMessages;
  operationMessages: OperationMessages;
}

const initialState: MessageState = {
  assetMessages: {
    unread: 0,
  } as AssetMessages,
  operationMessages: {} as OperationMessages,
};

export const cancelMethods = {
  spotCancel: 'spotCancel',
  gridCancel: 'gridCancel',
};

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchingOperationMessages(state) {
      state.operationMessages.loading = true;
    },
    fetchedOperationMessages(state, action) {
      const { list } = action.payload;
      state.operationMessages.loading = false;
      state.operationMessages.list = list;
    },
    fetchingAssetMessages(state) {
      state.assetMessages.loading = true;
    },
    fetchedAssetMessages(state, action) {
      const { list, hasNext, current, unread } = action.payload;
      if (state.assetMessages.current !== current && current !== 1) return;
      let newList = [];
      newList = state.assetMessages.list.concat(list || []);
      state.assetMessages.list = uniqBy(newList, 'id');
      state.assetMessages.unread = unread;
      state.assetMessages.loading = false;
      state.assetMessages.current = current;
      state.assetMessages.hasNext = hasNext;
      state.assetMessages.queryStartTime =
        state.assetMessages.list[0]?.create_time;
    },
    fetchedNewAssetMessages(state, action) {
      const { list, startTime, unread } = action.payload;
      state.assetMessages.unread = unread;
      if (list?.length > 0) {
        const newList = list
          .filter((t: any) => t.create_time > startTime)
          .concat(state.assetMessages.list);
        state.assetMessages.list = uniqBy(newList, 'id');
        state.assetMessages.queryStartTime = newList[0]?.create_time;
      }
    },
    fetchNextPageAssetMessages(state) {
      if (state.assetMessages.hasNext) {
        state.assetMessages.current += 1;
      }
    },
    readAssetMessage(state, action) {
      const { ids, readAll } = action.payload;
      if (ids) {
        state.assetMessages.unread =
          (state.assetMessages.unread ?? 0) - ids.length;
      }
      if (readAll) {
        state.assetMessages.unread = 0;
      }
    },
    clearAssetMessages(state, action) {
      const { list, hasNext, current } = action.payload;
      state.assetMessages.list = list;
      state.assetMessages.unread = 0;
      state.assetMessages.loading = false;
      state.assetMessages.hasNext = hasNext;
      state.assetMessages.current = current;
    },
    setQueryAssetMessagesParams(state, { payload = {} }) {
      const { current, queryEndTime, syncIn5S } = payload;
      if (current !== undefined) {
        state.assetMessages.current = current;
      }
      if (queryEndTime !== undefined) {
        state.assetMessages.queryEndTime = queryEndTime;
      }
      if (syncIn5S !== undefined) {
        state.assetMessages.syncIn5S = syncIn5S;
      }
    },
    setAssetMessagesSyncIn5S(state, { payload = {} }) {
      state.assetMessages.syncIn5S = payload.flag;
    },
  },
});

export const {
  fetchingOperationMessages,
  fetchedOperationMessages,
  fetchingAssetMessages,
  fetchedAssetMessages,
  fetchedNewAssetMessages,
  fetchNextPageAssetMessages,
  clearAssetMessages,
  readAssetMessage,
  setQueryAssetMessagesParams,
} = notification.actions;
export default notification.reducer;
