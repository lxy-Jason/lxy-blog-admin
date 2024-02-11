import request from '../request';

export const getArticleById = (id: string) => {
  return request('get',`article/getArticleById/${id}`)
}

export const updateArticleApi = (params:{id:string,content:string}) => {
  return request('post',`article/updateArticleById`,params)
}
