import axios from 'axios';

/**
 * apiClient wraps axios to provide a base URL and convenience methods for
 * communicating with our mocked backend. All HTTP requests are prefixed
 * with `/api`, which corresponds to the handlers defined in
 * `@teacher-ai/mocks`. Interceptors can be added later for auth tokens,
 * global error handling, logging, etc.
 */
export const apiClient = axios.create({
  baseURL: '/api'
});

// Example of a request interceptor. Currently this is a no‑op but
// demonstrates where auth tokens or other headers would be attached.
apiClient.interceptors.request.use(
  (config) => {
    // Attach auth token if available
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Example of a response interceptor. Here we simply pass through the
// response, but a real implementation could normalise errors or trigger
// global notifications.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401/403 errors globally, log out the user, etc.
    return Promise.reject(error);
  }
);

// Export typed helpers for common HTTP verbs. These helpers return the
// `.data` property from axios responses to streamline usage in components.
export const get = <T = any>(url: string, config = {}) =>
  apiClient.get<T>(url, config).then((res) => res);

export const post = <T = any, B = any>(url: string, body: B, config = {}) =>
  apiClient.post<T>(url, body, config).then((res) => res);

export const put = <T = any, B = any>(url: string, body: B, config = {}) =>
  apiClient.put<T>(url, body, config).then((res) => res);

export const del = <T = any>(url: string, config = {}) =>
  apiClient.delete<T>(url, config).then((res) => res);