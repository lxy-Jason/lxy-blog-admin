import request from '../request';
import { SiteInfo } from '@/types/meta';

export const getSiteInfo = () => {
  return request('get',`meta/getSiteInfo`)
}

export const updateSiteInfo = (params: SiteInfo) => {
  return request('post',`meta/updateSiteInfo`,params)
}
