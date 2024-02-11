import Markdown from '@/components/markdown';
// import Editor from '@/components/editor/index,';
import DirectoryTree from '@/components/DirectoryTree';

import { Layout } from 'antd';
const { Sider } = Layout;

import { useEffect, useState } from 'react';
import { getArticleById, updateArticleApi } from '@/services/api/article';
import { Article } from '@/types/article';


const ArticlePage: React.FC = () => {
  const [id, setId] = useState('')
  const [articleData, setArticleData] = useState<Article | undefined>()

  const getArticleId = (id:string) => {
    console.log(id)
    setId(id)
  }
  const updateArticle = (content: string) => {
    if(!id) return
    const params = {
      id,
      content
    }
    console.log(params)

    updateArticleApi(params).then(res => {
      console.log(res)
    })
  }
  useEffect(() => {
    if(id){
      getArticleById(id).then(res => {
        console.log(res)
        setArticleData(res.data)
      })
    }
  }, [id]);
  return (
    <>
      <Layout >
        <Sider width="300px">
          <DirectoryTree getArticleId={getArticleId}></DirectoryTree>
        </Sider>
          <Markdown content={articleData?.content || ''} updateArticle={updateArticle}></Markdown>
      </Layout>
    </>
  );
};

export default ArticlePage;
