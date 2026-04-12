import { useCallback } from 'react';

import { useSetLocale } from 'src/locals';
import { useIsAppH5, useUtmSource, useUUID } from 'src/providers/useWallet';
import { useThemeParams } from 'src/theme';
import { logEventTrack } from 'src/utils/log';
import { logger } from 'src/utils/logger';

import { useDexAccount } from 'js/state/dexAccount/hooks';

import { apiEventTrack, EventType } from './service';

export default function useEventTrack() {
  const dexAccount = useDexAccount();
  const { isMobile } = useThemeParams();
  const uuid = useUUID();
  const isAppH5 = useIsAppH5();
  const utmSource = useUtmSource();
  const { locale } = useSetLocale();

  return useCallback(
    ({ type, data }: { type: EventType; data: any }) => {
      // logger.log(type, data);
      logEventTrack({ type, data, uuid, utmSource });
      try {
        const time = Date.now();
        let dataParams = {
          ...data?.dataParams,
          l0_account: dexAccount?.account,
          lang: locale,
          uuid,
        };
        if (utmSource) {
          dataParams = {
            ...dataParams,
            utmSource,
          };
        }
        let client = isMobile ? 'mobile' : 'pc';
        if (isAppH5) {
          client = 'mobile_app';
        }

        const _data = {
          time,
          utm: dexAccount?.account,
          client,
          ...data,
          lang: locale,
          owner: dexAccount?.da_owner,
          data: JSON.stringify(dataParams),
        };

        apiEventTrack({
          time,
          type,
          uuid,
          data: _data,
        });
      } catch (error) {
        logger.error(error);
      }
    },
    [
      dexAccount?.account,
      uuid,
      utmSource,
      locale,
      dexAccount?.da_owner,
      isMobile,
      isAppH5,
    ]
  );
}
