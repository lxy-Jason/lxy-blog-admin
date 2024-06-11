import request from '../request';

export const getArticleById = (id: string) => {
  return request('get', `article/getArticleById/${id}`);
};

export const updateArticleApi = (params: { id: string; content: string }) => {
  return request('post', `article/updateArticleById`, params);
};

export const createNewArticle = (params: {
  title: string;
  category: string;
  content: string;
}) => {
  return request('post', `article/createNewArticle`, params);
};

export const deleteArticleById = (id: string) => {
  return request('get', `article/deleteArticleById/${id}`);
};
