import request from '../request';

export const getCategoryList = (star: boolean) => {
  return request('get', `category/getCategoryList?star=${star}`);
};
