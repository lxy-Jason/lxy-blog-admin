import request from '../request';

export const getCategoryList = () => {
  return request('get',`category/getCategoryList`)
}
