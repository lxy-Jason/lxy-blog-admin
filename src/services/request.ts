import {request} from '@umijs/max';

// const baseUrl = 'http://124.220.59.240:3667/'
const baseUrl = 'http://localhost:3667/'

export default (methods: string,url: string,params?: object) => {
  return request(baseUrl + url,{
    method:methods.toUpperCase(),
    data:params
  })
}
