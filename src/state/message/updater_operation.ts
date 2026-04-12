import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useEarliestUserCreateTime } from '../user/hooks';
import { fetchedOperationMessages, fetchingOperationMessages } from './reducer';
import { useFetchAllOperationMessages } from './service';

export default function UpdaterOperationMessages() {
  const dispatch = useDispatch();
  const fetchAllMessages = useFetchAllOperationMessages();
  const earlierTime = useEarliestUserCreateTime();
  useEffect(
    () => {
      dispatch(fetchingOperationMessages());
      fetchAllMessages({ start: earlierTime }).then((resp) => {
        dispatch(
          fetchedOperationMessages({
            list: resp.list,
          })
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, fetchAllMessages, earlierTime]
  );

  return null;
}
