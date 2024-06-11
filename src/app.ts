// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { getInit } from '@/services/api/meta';
import { RequestConfig } from '@umijs/max';
import { history } from 'umi';
import './style/code-dark.css';
import './style/code-light.css';
import './style/custom-container.css';
import './style/github-markdown.css';
import './style/global.less';
const loginPath = '/user/login';
export async function getInitialState(): Promise<{ name: string }> {
  const fetchInitData = async () => {
    try {
      const msg = await getInit();
      if (msg.code === 200) {
        history.push('/');
        return msg.data || {};
      }
      // else if (history.location.pathname === '/' && msg.code === 200) {
      //   history.push('/');
      // }
      return msg.data;
    } catch (error) {
      // console.log('fet init data error', error);
      history.push(loginPath);
      return {};
    }
  };
  // // 如果不是登录页面，执行
  // let option = {};
  // if (
  //   history.location.pathname === loginPath ||
  //   history.location.pathname === '/' ||
  //   !localStorage.getItem('token')
  // ) {
  //   // @ts-ignore
  //   option.skipErrorHandler = true;
  // }
  const initData = await fetchInitData();
  // 暗色模式
  // const theme = getInitTheme();
  // const sysTheme = mapTheme(theme);
  return {
    fetchInitData,
    ...initData,
    // settings: { ...defaultSettings, navTheme: sysTheme },
    // theme,
  };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

// 运行时配置
export const request: RequestConfig = {
  // 统一的请求设定
  timeout: 1000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },

  // 请求拦截器
  requestInterceptors: [
    (url, options) => {
      return {
        url: url,
        options: {
          ...options,
          interceptors: true,
          headers: {
            token: (() => {
              return window.localStorage.getItem('token') || 'null';
            })(),
          },
        },
      };
    },
  ],

  // 响应拦截器
  responseInterceptors: [],
};
