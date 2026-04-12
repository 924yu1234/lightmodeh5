import axios from 'js/utils/axios';

export function getTurboRangeApyBacktest({
  poolAddress,
  currentPrice,
  minPrice,
  maxPrice,
}: {
  poolAddress: string;
  currentPrice: string;
  minPrice: string;
  maxPrice: string;
}) {
  return axios({
    method: 'POST',
    url: '/order-book-api/turbo-range/apy-backtest',
    data: {
      pool: poolAddress,
      current_price: Number(currentPrice),
      price_lower: Number(minPrice),
      price_upper: Number(maxPrice),
    },
  })
    .then((resp: any) => {
      return Promise.resolve(resp.data);
    })
    .catch(() => {
      return Promise.resolve({});
    });
}
