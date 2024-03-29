import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
  // AxiosRequestConfig,
  AxiosResponse,
  // AxiosPromise,
} from "axios";
const baseUrl = import.meta.env.VITE_REACT_APP_API_URL || ""; // WHEN FRONTEND AND BACKEND ARE HOSTED ON SAME SERVER - USE SAME URL FOR ALL THE REQUESTS
// console.log("devUrl:", baseUrl);
// Create Axios Instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  // to set browser cookie
  withCredentials: true,
  headers: {
    // "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
    Accept: "application/json",
  } as AxiosRequestHeaders,
});

// Add an interceptor to handle request
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Do something before request is sent
      return config;
    } catch (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  }
);

// Add an interceptor to handle response
axiosInstance.interceptors.response.use(async (response: AxiosResponse) => {
  try {
    // console.log("response:", response);
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  } catch (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
});
export default axiosInstance;
