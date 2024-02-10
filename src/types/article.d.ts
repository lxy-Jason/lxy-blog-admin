export type Article = {
  content: string;
  category: string;
  // tags: string[];
  createdAt: string;
  title: string;
  updatedAt: string;
  _id: string;
  top?: number;
  private?: boolean;
  author?: string;
  copyright?: string;
  path: string;
};
export type ArticleData = {
  data: { list: Article[]; total?: number };
  msg: string;
};

export type categoryArticleList = {
  data: {
    _id: string;
    title: string;
    createdAt: string;
  }[];
};
export type timelineArticleDate = {
  title: string;
  id: string;
  date: string;
  month?: string;
};
export type timelineData = {
  [month: string]: Array<timelineArticleDate>;
};
