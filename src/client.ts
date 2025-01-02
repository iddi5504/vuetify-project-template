import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosStatic, type CreateAxiosDefaults } from "axios";
type RequestConfig = Pick<AxiosRequestConfig, "headers" | "params">;

export class AxiosClient {
    $axios: AxiosInstance;

    onLogout: () => void = () => {

    };

    constructor(
        axios: AxiosStatic,
        config: CreateAxiosDefaults,
        private disableAuth = false,
        onLogout?: Function
    ) {
        this.$axios = axios.create({
            ...config,
        });


        if (this.disableAuth) return;
        this.initAuthTokenInterceptor();
        this.initAutoLogoutInterceptor(onLogout);
    }
    postFile<T>(url: string, payload: FormData, config?: RequestConfig) {

        return this.$axios.post<unknown, AxiosResponse<T>>(url, payload, config);
    }

    get<T>(url: string, config?: RequestConfig) {
        return this.$axios.get<T>(url, config);
    }

    post<T>(
        url: string,
        payload?: Record<string, unknown>,
        config?: RequestConfig,
    ) {
        return this.$axios.post<unknown, AxiosResponse<T>>(url, payload, config);
    }

    put<T>(
        url: string,
        payload?: Record<string, unknown>,
        config?: RequestConfig,
    ) {
        return this.$axios.put<unknown, AxiosResponse<T>>(url, payload, config);
    }

    patch<T>(
        url: string,
        payload?: Record<string, unknown>,
        config?: RequestConfig,
    ) {
        return this.$axios.patch<unknown, AxiosResponse<T>>(url, payload, config);
    }

    delete(
        url: string,
        payload?: Record<string, unknown>,
        config?: RequestConfig,
    ) {
        return this.$axios.delete(url, { ...config, data: payload });
    }

    initAuthTokenInterceptor() {
        this.$axios.interceptors.request.use(
            async (config) => {
                const accessToken = localStorage.getItem('jwt_access_token');

                const authorization = config.headers.authorization;


                if (accessToken && !authorization) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            },
        );
    }

    // auto logout if 401 response returned from api
    initAutoLogoutInterceptor(onLogout?: Function) {
        this.$axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status === 401) {
                    // auto logout if 401 response returned from api
                    // eslint-disable-next-line no-console
                    this.onLogout();
                }

                return Promise.reject(error);
            },
        );
    }
}
