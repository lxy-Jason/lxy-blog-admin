import React, { useEffect, useState } from 'react';

import { Tree } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';
import style from './index.less'
import { getCategoryList } from '@/services/api/category';
import treeDataFormat from '@/utils/treeDataFormat';
type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

interface MyComponentProps extends IntrinsicAttributes {
  getArticleId: (id: string) => void;
  // 其他属性...
}
const DiretoryTree: React.FC<MyComponentProps>= ({getArticleId}) => {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
    if(info.selectedNodes[0].isLeaf){
      // @ts-ignore
      getArticleId(info.selectedNodes[0].key)
    }

  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  const [treeData, setTreeData] = useState<TreeDataNode[]>([])
  useEffect(() => {
    getCategoryList().then(res => {
      console.log(res)
      setTreeData(treeDataFormat(res.data))
    })
  }, []);
  return (
    <DirectoryTree
      style={{ height: window.innerHeight - 64 }}
      className={style.directoryTree}
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default DiretoryTree;
