import * as axios from "axios";

axios.default.defaults.baseURL = "";

axios.default.interceptors.response.use(response => {
  return response;
}, error => {
  console.error(error);
  return Promise.reject(error?.response?.data || error);
});
const client = axios.default;

export default client;
