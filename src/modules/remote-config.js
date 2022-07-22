import { remote } from "~/composables";
import { localToken, isDark } from "~/composables";
const JAVA_SUCCESS_CODE = "1";
import {
  createDiscreteApi,
  darkTheme,
  lightTheme
} from 'naive-ui'
const configProviderPropsRef = computed(() => ({
  theme: isDark.value ? darkTheme : lightTheme
}))
const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef
  }
)

export const install = () => {
  remote.init({
    //缓存获取相关
    onCacheRetrieve(option) {
      return null;
    },

    //设置token
    onInterceptRequest(axiosRequest, option) {
      axiosRequest.headers.Authorization = option.token || unref(localToken) || "";
      return axiosRequest;
    },
    //响应处理
    onInterceptResponse(axiosResponse, option) {
      return new Promise((resolve, reject) => {
        if (axiosResponse.status === 200) {
          //在此处进行响应拦截
          if (axiosResponse.data.status === JAVA_SUCCESS_CODE) {
            if (option.showSuccessMessage) {
              message.success(axiosResponse.data.msg || axiosResponse.data.text || "操作成功");
            }
            resolve(axiosResponse.data);
          } else {
            message.error(axiosResponse.data.msg || axiosResponse.data.text);
            reject(axiosResponse.data.msg);
          }
        } else {
          message.error(axiosResponse.data.msg || axiosResponse.statusText);
          reject(axiosResponse);
        }
      });
    },

    onInterceptRejectedRequest(error, option) {
      if (option.showErrorMessage && error) {
        message.error(error.message || String(error));
      }
      return error;
    },
    onInterceptRejectedResponse(error, option) {
      if (option.showErrorMessage && error) {
        message.error(error.message || String(error));
      }
      return error;
    },

    startLoading(option) {
    },
    stopLoading(option) {
    },
  });
}
