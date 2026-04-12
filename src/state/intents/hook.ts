import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '..';
import { useDexAccount } from '../dexAccount/hooks';
import { addIntents, removeIntent } from './reducer';

export const useIntents = () => {
  const { account } = useDexAccount();
  const intents = useSelector((state: AppState) => state.intents.intentLists);
  return useMemo(() => intents[account], [intents, account]);
};

export const useAddIntents = () => {
  const dispatch = useDispatch();
  const { account } = useDexAccount();
  return useCallback(
    (intents: any[]) => {
      dispatch(addIntents({ intents, account }));
    },
    [dispatch, account]
  );
};

export const useRemoveIntent = () => {
  const dispatch = useDispatch();
  const { account } = useDexAccount();
  return useCallback(
    (intentId: number) => {
      dispatch(removeIntent({ intentId, account }));
    },
    [dispatch, account]
  );
};
