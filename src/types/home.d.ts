type ViewerGridItem = {
  date: string;
  visited: number;
  viewer: number;
};

type ViewerGrid = {
  total: ViewerGridItem[];
  each: ViewerGridItem[];
};

type ViewerData = {
  grid: ViewerGrid;
  add: {
    viewer: number;
    visited: number;
  };
  now: {
    viewer: number;
    visited: number;
  };
};

export type chartData = {
  total: {
    wordCount: number;
    articleNum: number;
  };
  viewer: ViewerData;
  link: {
    baseUrl: string;
    enableComment: string;
  };
};

type ArticleData = {
  pathname: string;
  title: string;
  tags: string[];
  top: number;
  category: string;
  hidden: boolean;
  private: boolean;
  viewer: number;
  visited: number;
  createdAt: string;
  updatedAt: string;
  id: number;
  lastVisitedTime: string;
};

type ArticleListData = {
  enableGA: boolean;
  enableBaidu: boolean;
  topViewer: ArticleData[];
  topVisited: ArticleData[];
  recentVisitArticles: ArticleData[];
  siteLastVisitedTime: string;
  siteLastVisitedPathname: string;
  totalViewer: number;
  totalVisited: number;
  maxArticleVisited: number;
  maxArticleViewer: number;
};
