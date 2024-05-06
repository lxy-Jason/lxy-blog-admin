import { request } from '@umijs/max';

// const baseUrl = 'http://124.220.59.240:3667/'
const baseUrl = 'http://localhost:3667/';

export default (
  method: string,
  url: string,
  params?: object,
  options?: object,
) => {
  const requestOptions = {
    method: method.toUpperCase(),
    data: params,
    ...options, // 将传入的 options 参数合并到 requestOptions 中
  };

  return request(baseUrl + url, requestOptions);
};
