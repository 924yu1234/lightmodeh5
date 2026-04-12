import { createReducer } from '@reduxjs/toolkit';

import { getRegionData } from './actions';

const initialState = {
  region: {},
};

export default createReducer(initialState, (builder) =>
  builder.addCase(getRegionData, (state, action) => {
    const { region } = action.payload;
    state.region = region;
  })
);
