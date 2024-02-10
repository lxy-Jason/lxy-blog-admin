import {request} from '@umijs/max';

const baseUrl = 'http://124.220.59.240:3667/'
export default (methods: string,url: string,params?: {}) => {
  return request(baseUrl + url,{
    method:methods.toUpperCase(),
    ...params
  })
}
