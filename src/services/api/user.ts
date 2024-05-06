import request from '../request';

export const login = (params: { name: string; password: string }) => {
  return request('post', 'user/login', params);
};
