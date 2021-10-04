import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 1 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 1000 },
    { duration: '1m', target: 1000 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3000'; // make sure this is not production
  const productId = Math.floor(Math.random() * 999999) + 1

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/products/${productId}`,
      null,
      { tags: { name: 'getProduct' } },
    ],
    [
      'GET',
      `${BASE_URL}/products/${productId}/styles`,
      null,
      { tags: { name: 'getStyles' } },
    ],
    [
      'GET',
      `${BASE_URL}/products/${productId}/related`,
      null,
      { tags: { name: 'getRelated' } },
    ],
  ]);

  sleep(1);
}

// export default function () {
//   const productId = Math.floor(Math.random() * 999999) + 1
//   http.get(`http://localhost:3000/products/${productId}`);
//   http.get(`http://localhost:3000/products/${productId}/styles`);
//   http.get(`http://localhost:3000/products/${productId}/related`);
//   // sleep(1);
// }
