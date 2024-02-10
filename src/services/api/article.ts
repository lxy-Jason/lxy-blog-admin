import request from '../request';

export const getArticleById = (id: string) => {
  return request('get',`article/getArticleById/${id}`)
}
