import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useClientConfig from 'src/hooks/useClientConfig';

import { updateSwapTokens, updateTokenTags } from './reducer';
import { fetchSwapDefaultTokens } from './service';

export default function SwapTokensUpdater() {
  const dispatch = useDispatch();
  const { data: tags } = useClientConfig('tokenTags');

  useEffect(() => {
    fetchSwapDefaultTokens().then((tokens) => {
      dispatch(updateSwapTokens({ tokens }));
    });
  }, [dispatch]);

  useEffect(() => {
    if (tags && tags?.length) {
      const map = tags.reduce((re: any, tag: any) => {
        re[tag.token] = tag.title;
        return re;
      }, {});
      dispatch(updateTokenTags({ tags: map }));
    }
  }, [dispatch, tags]);

  return null;
}
