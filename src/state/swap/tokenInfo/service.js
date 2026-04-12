import axios from 'js/utils/axios';
import { isNumber } from 'js/utils/digit';

export const fetchSwapTokenPrice = ({ tokenIds }) => {
  const ids = tokenIds.filter((d) => isNumber(d));
  if (!ids.length) {
    return Promise.reject();
  }
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/price',
    params: {
      token_id_list: ids.join(','),
    },
  }).then((resp) => {
    const data = resp.data;
    return data.map((d) => {
      return {
        id: d.token_id,
        price: d.price,
        percent: d.percent,
      };
    });
  });
};
