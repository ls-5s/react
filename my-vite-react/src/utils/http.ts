import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// 从环境变量获取基础URL
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// 定义API响应结构
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 全局导航函数，用于在拦截器中进行页面跳转
let globalNavigate: ((path: string) => void) | null = null;

// 设置全局导航函数
export const setGlobalNavigate = (navigateFunction: (path: string) => void) => {
  globalNavigate = navigateFunction;
};

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 携带token
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err: any) => Promise.reject(err),
);

// 响应拦截器
instance.interceptors.response.use(
  (res: AxiosResponse<ApiResponse>) => {
    // 检查业务状态码（可根据实际API调整）
    if (res.data.code === 0 || res.data.code === 200 || res.data.code === 201) {
      return res.data.data;
    } else {
      // 处理业务错误
      console.error(res.data.message || "服务异常");
      return Promise.reject(res.data);
    }
  },
  (err: any) => {
    // 处理HTTP错误
    if (err.response?.status === 401) {
      // 401错误：权限不足或token过期
      console.warn("Authentication failed, redirecting to login.");
      localStorage.removeItem("token"); // 清除无效token

      // 使用全局导航函数跳转到登录页
      if (globalNavigate) {
        globalNavigate("/login");
      } else {
        // 如果没有设置全局导航，则使用window.location
        window.location.href = "/login";
      }
    } else if (err.response?.status === 403) {
      console.error("Access forbidden");
    } else if (err.response?.status >= 500) {
      console.error("Server error");
    } else {
      console.error(err.response?.data?.message || "服务异常");
    }

    return Promise.reject(err);
  },
);

export default instance;
export { baseURL };
