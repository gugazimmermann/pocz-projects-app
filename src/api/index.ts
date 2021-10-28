/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios, { AxiosInstance } from 'axios';
import TokenService from './token';

const RefreshTokenAuthPaths = [
  '/auth/register',
  '/auth/login',
  '/auth/forgot-password',
  '/auth/change-password',
  '/auth/plans',
];

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PROJECT_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = TokenService.getLocalAccessToken();
  if (token && config.headers) config.headers['x-access-token'] = token;
  return config;
},
(error) => Promise.reject(error));

api.interceptors.response.use((res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (!RefreshTokenAuthPaths.includes(originalConfig.url) && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await api.post('/auth/refresh-token', {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  });

export default api;
