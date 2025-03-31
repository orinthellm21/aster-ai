import { LocalStorageKey } from '@/constants/app.constants';
import axios from 'axios';

interface ErrResponse {
  response: {
    status: number;
  };
  config: {
    _retry: boolean;
  };
}

const isExpiredJWT = ({ response, config }: ErrResponse) =>
  response?.status === 401 && config && !config?._retry;

/**
 * TODO Calling api refresh token
 * @returns
 */
const refreshToken = () => {
  throw new Error(`Refresh token is not supported.`);
};

const headersConfig = {};

const httpClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/client`,
  // withCredentials: true,
  timeout: 5 * 60 * 1000,
  headers: headersConfig,
});

httpClient.interceptors.request.use((config) => {
  try {
    /**
     * TODO Modify to right token
     */
    const accessToken = JSON.parse(
      localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) || '',
    );
    config.headers.setAuthorization(
      `Bearer ${typeof accessToken === 'string' ? accessToken : ''}`,
    );
  } catch {
    /* empty */
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (isExpiredJWT(error)) {
      originalRequest._retry = true;

      try {
        const { data } = refreshToken();

        localStorage.set(LocalStorageKey.ACCESS_TOKEN, data);

        return await httpClient(originalRequest);
      } catch {
        /* empty */
      }
    }
    return Promise.reject(error as Error);
  },
);

export default httpClient;
