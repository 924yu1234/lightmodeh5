import { useMemo } from 'react';

import useClientConfig from 'src/hooks/useClientConfig';
import { useInfo, useRegionInfo } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { compareVersions } from 'src/utils/numberUtils';

import axios from 'js/utils/axios';

export function fetchBanners() {
  return axios({
    method: 'GET',
    url: '/order-book-api/home/banners',
  }).then((resp: any) => {
    return (resp.data?.banners || []).map((l: any) => {
      const title: Record<string, string> = {};
      const image: Record<string, string> = {};
      (l.i18n_list || []).forEach((item: any) => {
        title[item.locale] = item.i18n_value;
        image[item.locale] = item.i18n_image_url;
      });

      return {
        ...l,
        token: {
          ...l.token_info,
        },
        startTime: l.start_at * 1000,
        endTime: l.end_at * 1000,
        title,
        image,
      };
    });
  });
}

export function fetchHomeBtns() {
  return axios({
    url: `/order-book-api/clientDisplayConfig`,
    method: 'GET',
    params: {
      key: `homeBtns_Mobile`,
    },
  }).then((resp: any) => {
    const { data } = resp;
    return data?.value ? JSON.parse(data.value) : {};
  });
}

export function fetchHomeTabs(device: string) {
  return axios({
    url: `/order-book-api/clientDisplayConfig`,
    method: 'GET',
    params: {
      key: `homeTabs_${device}`,
    },
  }).then((resp: any) => {
    const { data } = resp;
    return data?.value ? JSON.parse(data.value) : {};
  });
}

export function fetchConfigs(key: string) {
  return axios({
    url: `/order-book-api/clientDisplayConfig`,
    method: 'GET',
    params: {
      key,
    },
  }).then((resp: any) => {
    const { data } = resp;
    return data?.value ? JSON.parse(data.value) : {};
  });
}

export function useHomeTabs(device: 'Mobile' | 'PC') {
  const { data: tabs } = useClientConfig(`homeTabs_${device}`);
  const { regionCode } = useRegionInfo();
  const { features } = useDexAccount();

  const info = useInfo();
  const releaseVersion = info?.releaseVersion;

  const showTabs = useMemo(() => {
    return (tabs || []).filter((btn: any) => {
      const { minVersion, maxVersion, countries, whitelistKey } = btn;

      const versionFlag = (() => {
        if (!minVersion && !maxVersion) return true;
        if (!releaseVersion) return false;
        if (minVersion) {
          if (compareVersions(releaseVersion, minVersion) < 0) {
            return false;
          }
        }
        if (maxVersion) {
          if (compareVersions(releaseVersion, maxVersion) > 0) {
            return false;
          }
        }
        return true;
      })();

      if (!versionFlag) return false;

      const countryFlag = (() => {
        if (!countries?.length) return true;
        if (!regionCode) return false;
        return countries.includes(regionCode);
      })();

      const inWhiteList = (() => {
        if (!whitelistKey) return false;
        if (!features) return false;
        return !!features[whitelistKey];
      })();
      if (countryFlag || inWhiteList) return true;
      return true;
    });
  }, [tabs, releaseVersion, regionCode, features]);

  return showTabs;
}
