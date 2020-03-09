import axios from 'axios';
import { APP_SECRET as api_key } from '../const';
/**
 * Is a base configuation of axios services to call external API's
 */

export function createAxiosInstance(baseURL) {
  const instance = axios.create({
    baseURL
  });

  instance.interceptors.request.use(
    function(config) {
      config.params['api_key'] = api_key;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  return instance;
}
