import axios from 'js/utils/axios';

export const fetchBanner = () => {
  return axios({
    url: `/order-book-api/banner/notification`,
    method: 'GET',
  }).then((resp: any) => {
    return (resp.data || []).map((d: any) => {
      return {
        ...d,
        key: d.i18n_list?.[0]?.i18n_key,
        i18n: d.i18n_list.reduce((re: any, item: any) => {
          re[item.locale] = item.i18n_value;
          return re;
        }, {}),
      };
    });
  });
};
