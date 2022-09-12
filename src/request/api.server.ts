import axios, { AxiosRequestConfig } from "axios";
import { Code } from "./enum/code-type.enum";
import { MethodType } from "./enum/method-type.enum";
import { useMessage } from 'naive-ui'
import config from "@/config/api.config";

const _baseUrl = config.baseUrl.dev // 使用到代理

interface Query {
    [key: string]: any;
}

const Message = useMessage()

/**
 * @description: REST请求服务
 * @author 胖三斤
 * @date 2022/09/12 18:45
 */
class ApiService {

    /**
     * @description: 初始化
     * @author 胖三斤
     * @date 2022/09/12 18:45
     */
    init(): void {
        // 创建http实例
        axios.create({
            baseURL: _baseUrl,
            timeout: 5 * 1000,
            headers: this.createBasicHeaders()
        })

        // 请求拦截
        axios.interceptors.request.use(config => {
            config.headers = config.headers || {}
            if (localStorage.getItem("token")) {
                config.headers.token = localStorage.getItem("token") || ""
            }
            return config
        })

        axios.interceptors.response.use(res => {
            // 处理非正常请求
            const code: string = res.data?.code
            if (code != Code.SUCCESS.code) {
                Message.error(res.data.message)
            }
        }, error => {
            let { message } = error;
            if (message == "Network Error") {
                message = "后端接口连接异常";
            } else if (message.includes("timeout")) {
                message = "系统接口请求超时";
            } else if (message.includes("Request failed with status code")) {
                message = "系统接口" + message.substr(message.length - 3) + "异常";
            }
            Message.error(message)
        })
    }

    post(path: string, params: any, query: Query | undefined, requestConfig: AxiosRequestConfig): any {
        path = query != null ? this.urlQueryConvert(path, query) : path;
        return axios
            .post(`${path}`, params, requestConfig)
            .then(this.createBusCodeHander())
            .catch(this.createErrorHander());
    }

    get(path: string, query: Query | undefined, requestConfig: AxiosRequestConfig): any {
        path = query != null ? this.urlQueryConvert(path, query) : path;
        return axios
            .get(`${path}`, requestConfig)
            .then(this.createBusCodeHander())
            .catch(this.createErrorHander());
    }

    put(path: string, params: any, query: Query | undefined, requestConfig: AxiosRequestConfig): any {
        path = query != null ? this.urlQueryConvert(path, query) : path;
        return axios
            .put(`${path}`, params, requestConfig)
            .then(this.createBusCodeHander())
            .catch(this.createErrorHander());
    }

    delete(path: string, query: Query | undefined, requestConfig: AxiosRequestConfig): any {
        path = query != null ? this.urlQueryConvert(path, query) : path;
        return axios
            .delete(path, requestConfig)
            .then(this.createBusCodeHander())
            .catch(this.createErrorHander());
    }

    /**
     * @description: 通用请求函数
     * @author 胖三斤
     * @date 2022/09/12 15:19
     * @param api               调用接口的对象
     * @param query             问号？后参数
     * @param params            post、put、delete参数 非必须
     * @param requestConfig     请求配置，如果上传文件、form提交等配置 非必须
     */
    general(api: any, query?: Query | undefined, params?: any | undefined, requestConfig?: AxiosRequestConfig | any): any {
        if (!!api.url && !!api.method) {
            requestConfig = this.createBasicHeaders();
            switch (api.method) {
                case MethodType.GET.code:
                    return this.get(api.url, query, requestConfig);
                case MethodType.PUT.code:
                    return this.put(api.url, params, query, requestConfig);
                case MethodType.POST.code:
                    return this.post(api.url, params, query, requestConfig);
                case MethodType.DELETE.code:
                    return this.delete(api.url, query, requestConfig);
            }
        }
    }

    /**
     * @description:  创建基础消息头
     * @author 胖三斤
     * @date 2022/09/12 18:45
     */
    createBasicHeaders(): any {
        return {
            "Content-Type": "application/json",
            Accept: "application/json"
        };
    }

    /**
     * @description: 错误码处理器
     * @author 胖三斤
     * @date  2022/09/12 18:45
     */
    createBusCodeHander() {
        return function (response: any) {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        };
    }

    /**
     * @description: 异常处理器
     * @author 胖三斤
     * @date 2022/09/12 18:45
     */
    createErrorHander() {
        return function (error: any) {
            if (error.response) {
                return {
                    code: 0,
                    msg: error.response?.data?.msg || "网络连接异常，稍后请重试或联系管理员"
                };
            } else if (error.request) {
                return {
                    code: 0,
                    msg: error.request?.data?.msg || "网络连接异常，稍后请重试或联系管理员"
                };
            } else {
                return {
                    code: 0,
                    msg: "未知异常，稍后请重试或联系管理员"
                };
            }
        };
    }

    /**
     * @description: url请求参数组装
     * @author 胖三斤
     * @date 2022/09/12 18:45
     */
    urlQueryConvert(url: string, query: Query) {
        let connectiveSymbol = "";
        if (url.indexOf("?") !== -1) {
            connectiveSymbol = "&";
        } else {
            connectiveSymbol = "?";
        }
        if (query) {
            Object.keys(query).forEach((key, idx) => {
                const val = query[key];
                if (idx === 0) {
                    if (val != null && val !== "null" && val !== "undefined") {
                        url += connectiveSymbol + key + "=" + val;
                    } else {
                        url += connectiveSymbol + key + "=";
                    }
                } else {
                    if (val != null && val !== "null" && val !== "undefined") {
                        url += "&" + key + "=" + val;
                    } else {
                        url += "&" + key + "=";
                    }
                }
            });
        }
        return url;
    }

}
const apiService = new ApiService();
export default apiService;
