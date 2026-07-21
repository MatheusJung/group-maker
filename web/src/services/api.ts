import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { TokenResponse } from '../types/auth';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const apiPublica: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let memoriaAccessToken: string = '';

// Trava atômica global que impede requisições paralelas redundantes
let promessaRefreshEmAndamento: Promise<AxiosResponse<TokenResponse>> | null = null;

export const setMemoriaAccessToken = (token: string): void => {
  memoriaAccessToken = token;
};

// Hook utilitário exportável para o AuthContext carregar a sessão sem duplicar
export const executarAutoRefreshGlobal = async (): Promise<AxiosResponse<TokenResponse>> => {
  promessaRefreshEmAndamento ??= axios.post<TokenResponse>(
    `${BASE_URL}/auth/refresh`,
    {},
    { withCredentials: true }
  );

  try {
    const resultado = await promessaRefreshEmAndamento;
    return resultado;
  } finally {
    promessaRefreshEmAndamento = null; // Reseta após a conclusão
  }
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (memoriaAccessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${memoriaAccessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.url?.includes('/auth/refresh')) {
      throw error;
    }

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await executarAutoRefreshGlobal();
        
        const novoAccessToken = response.data.accessToken;
        setMemoriaAccessToken(novoAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${novoAccessToken}`;
        }
        
        return api(originalRequest);
      } catch (refreshError) {
        setMemoriaAccessToken('');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        throw refreshError;
      }
    }

    throw error;
  }
);
