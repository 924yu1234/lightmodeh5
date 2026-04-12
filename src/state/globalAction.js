import { createAction } from '@reduxjs/toolkit';
// allows any updates to be applied to store data loaded from localStorage
export const updateVersion = createAction('global/updateVersion');
