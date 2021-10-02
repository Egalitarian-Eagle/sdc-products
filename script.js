import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 1000,
  duration: '30s',
  // stages: [
  //   { duration: '30s', target: 20 },
  //   { duration: '1m30s', target: 10 },
  //   { duration: '20s', target: 0 },
  // ],
}

export default function () {
  const productId = Math.floor(Math.random() * 1000000)
  http.get(`http://localhost:3000/products/${productId}`);
  http.get(`http://localhost:3000/products/${productId}/styles`);
  http.get(`http://localhost:3000/products/${productId}/related`);
  // sleep(1);
}
