import Markdown from '@/components/markdown';
// import Editor from '@/components/editor/index,';
import DirectoryTree from '@/components/DirectoryTree';

import { Layout } from 'antd';
const { Sider } = Layout;

import { useEffect, useState } from 'react';
import { getArticleById } from '@/services/api/article';
import { Article } from '@/types/article';


const ArticlePage: React.FC = () => {
  const [id, setId] = useState('')
  const [articleData, setArticleData] = useState<Article | undefined>()

  const getArticleId = (id:string) => {
    console.log(id)
    setId(id)
  }
  useEffect(() => {
    getArticleById(id).then(res => {
      console.log(res)
      setArticleData(res.data)
    })
  }, [id]);
  return (
    <>
      <Layout >
        <Sider width="300px">
          <DirectoryTree getArticleId={getArticleId}></DirectoryTree>
        </Sider>
          <Markdown content={articleData?.content || ''}></Markdown>
      </Layout>
    </>
  );
};

export default ArticlePage;
