import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '5s', target: 1 },
    { duration: '15s', target: 10 },
    { duration: '15s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '1m30s', target: 1000 },
    { duration: '1m', target: 1000 },
    { duration: '2m', target: 0 },
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3000'; // make sure this is not production
  const productId = Math.floor(Math.random() * 999999) + 1;
  const userId = Math.floor(Math.random() * 1999) + 1;
  const randomSku = Math.floor(Math.random() * 9999) + 1;
  const randomCount = Math.floor(Math.random() * 14) + 1;

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
    [
      'GET',
      `${BASE_URL}/cart/${userId}`,
      null,
      { tags: { name: 'getCart' } },
    ],
    [
      'POST',
      `${BASE_URL}/cart/${userId}`,
      { sku_id: randomSku, count: randomCount },
      { tags: { name: 'postCart' } },
    ],
  ]);

  check(responses[4], {
    'form data OK': (res) => JSON.parse(res.body)['form']['hello'] == 'world!',
  });

  sleep(1);
}
