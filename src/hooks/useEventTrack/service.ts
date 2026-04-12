import { debounce } from 'lodash';

import axios from 'js/utils/axios';

export enum EventType {
  LoginMessage = 'LoginMessage',
  page_view = 'page_view',
  time_on_page = 'time_on_page',
  initialization_started = 'initialization_started',
  insufficient_balance_before_init = 'insufficient_balance_before_init',
  initialization_action = 'initialization_action',
  initialization_completed = 'initialization_completed',
  new_user_first_order_started = 'new_user_first_order_started',
  new_user_first_order_action = 'new_user_first_order_action',
  new_user_first_order_completed = 'new_user_first_order_completed',
  unable_to_initialize = 'unable_to_initialize',
  connect_wallet_started = 'connect_wallet_started',
  connect_wallet_action = 'connect_wallet_action',
  connect_wallet_completed = 'connect_wallet_completed',
  grid_auto_input = 'grid_auto_input',
  grid_manual_input = 'grid_manual_input',
  view_grid_action = 'view_grid_action',
  grid_calculation = 'grid_calculation',
  grid_confirm_started = 'grid_confirm_started',
  grid_confirm_action = 'grid_confirm_action',
  grid_confirm_completed = 'grid_confirm_completed',
  view_grid_started = 'view_grid_started',
  view_grid_completed = 'view_grid_completed',
  change_language_started = 'change_language_started',
  change_language_completed = 'change_language_completed',

  swap_input = 'swap_input',
  swap_calculation = 'swap_calculation',
}

let _events: any[] = [];

const debounced = debounce(doApiEventTrack, 100, {
  maxWait: 1000,
});

export function apiEventTrack({
  uuid,
  time,
  type,
  data,
}: {
  uuid: string;
  time: number;
  type: EventType;
  data: any;
}) {
  _events = _events.concat({
    k: uuid,
    t: type,
    ts: time,
    v: data,
  });
  return debounced(_events);
}

export function doApiEventTrack(datas: any[]) {
  _events = [];
  // return Promise.resolve({});
  return axios({
    method: 'POST',
    url: '/order-book-event-track/datas',
    data: {
      datas,
    },
  });
}
