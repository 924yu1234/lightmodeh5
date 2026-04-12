import axios from 'js/utils/axios';
export const getExplanations = () => {
  return axios({
    method: 'GET',
    url: `/order-book-api/copywriting`,
  }).then((resp: any) => {
    const data = resp.data || {};
    return data;
  });
};
