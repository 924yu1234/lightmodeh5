import { createSlice } from '@reduxjs/toolkit';

export interface BannerMessage {
  id: number;
  key: string;
  i18n: { [key: string]: string };
  end_time: number;
  start_time: number;
  start_version: string;
  end_version: string;
  show_page: string;
  show_after_close: number;
  show_after_connect: boolean;
  is_html: boolean;
  is_closeable: boolean;
}

export interface NotificationState {
  bannerMessages: BannerMessage[];
  userInterviewConditions: {
    loginedTimes: number;
    matched: boolean;
  };
}

const initialState: NotificationState = {
  bannerMessages: [],
  userInterviewConditions: {
    loginedTimes: 0,
    matched: false,
  },
};

export const cancelMethods = {
  spotCancel: 'spotCancel',
  gridCancel: 'gridCancel',
};

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchedBannerMessage(state, { payload }) {
      state.bannerMessages = payload.messages;
    },
    changeUserInterviewConditions(state, { payload }) {
      state.userInterviewConditions = payload;
    },
  },
});

export const { fetchedBannerMessage, changeUserInterviewConditions } =
  notification.actions;
export default notification.reducer;
