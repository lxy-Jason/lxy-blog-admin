import { SiteInfo } from '@/types/meta';
import request from '../request';

export const getSiteInfo = () => {
  return request('get', `meta/getSiteInfo`);
};
// 后台初始化接口
export const getInit = () => {
  return request(
    'get',
    `meta/getInit`,
    {},
    {
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  );
};

export const updateSiteInfo = (params: SiteInfo) => {
  return request('post', `meta/updateSiteInfo`, params);
};
