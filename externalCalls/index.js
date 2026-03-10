const axios = require('axios');
const CircuitBreaker = require('opossum');

const BASE_URL = process.env.MAINAPI_URL || 'http://localhost:3000';

// axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// generic request function

try{
async function request(config) {
  const response = await api(config);
  return response.data;
}


// circuit breaker
const breaker = new CircuitBreaker(request, {
  timeout: 7000,
  errorThresholdPercentage: 50,
  resetTimeout: 20000
});

breaker.on('open', () => console.log('Central API Circuit OPEN'));
breaker.on('close', () => console.log('Central API Circuit CLOSED'));
}catch(e)
{
console.log("fault", e);
}
module.exports = {
  post: (url, data) => breaker.fire({ method: 'post', url, data }),
  get: (url, params) => breaker.fire({ method: 'get', url, params }),
};