import React, { useEffect, useState } from 'react';

import { Dropdown, Input, MenuProps, Modal, Tree, message } from 'antd';

import { createNewArticle, deleteArticleById } from '@/services/api/article';
import { getCategoryList } from '@/services/api/category';
import treeDataFormat from '@/utils/treeDataFormat';
import type { TreeDataNode } from 'antd';
import { GetProps } from 'react-redux';
import style from './index.less';

type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

interface MyComponentProps extends IntrinsicAttributes {
  getArticleId: (id: string) => void;
  // 其他属性...
}

const DiretoryTree: React.FC<MyComponentProps> = ({ getArticleId }) => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modaltype, setModaltype] = useState('add');
  const [title, setTitle] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [articleId, setArticleId] = useState('');
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
    if (info.selectedNodes[0].isLeaf) {
      // @ts-ignore
      getArticleId(info.selectedNodes[0].key);
      // @ts-ignore
      setArticleId(info.selectedNodes[0].key);
    } else {
      // @ts-ignore
      setCurrentCategory(keys[0]);
    }
  };
  // 分类展开回调
  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
    // @ts-ignore
  };

  const getMenuData = (nodeData: any) => {
    const items: MenuProps['items'] = [
      {
        key: 'delete',
        label: '删除',
      },
    ];
    // 非叶子节点
    if (!nodeData?.isLeaf) {
      items.unshift({
        key: 'add',
        label: '新增',
      });
    }
    const onClick: MenuProps['onClick'] = (e) => {
      console.log(e);
      setIsModalOpen(true);
      setModaltype(e.key);
    };
    return { items, onClick };
  };

  const titleRender = (nodeData: any) => {
    return (
      <Dropdown menu={getMenuData(nodeData)} trigger={['contextMenu']}>
        <span className={style.dropdownItem}>{nodeData.title}</span>
      </Dropdown>
    );
  };
  // 获取分类列表
  const getCategory = () => {
    getCategoryList(true).then((res) => {
      console.log(res);
      setTreeData(treeDataFormat(res.data));
    });
  };

  // 对话框确定按钮回调
  const handleOk = async () => {
    if (modaltype === 'add') {
      console.log(title);
      const params = {
        title,
        category: currentCategory,
        content: '',
      };
      const res = await createNewArticle(params);
      console.log(res);
      if (res.code === 400) {
        message.error(res.message);
        return;
      }
      getArticleId(res.data._id);
      getCategory();
    }
    if (modaltype === 'delete') {
      deleteArticleById(articleId).then((res) => {
        if (res.code === 200) {
          message.success('删除成功');
          setArticleId('');
          getArticleId('');
          getCategory();
        }
      });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log();
    setIsModalOpen(false);
  };

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const renderModal = () => {
    if (modaltype === 'add') {
      return (
        <Modal
          title="新增文章"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            placeholder="请输入文章名"
            onChange={titleChange}
            value={title}
          />
        </Modal>
      );
    }
    if (modaltype === 'delete') {
      return (
        <Modal
          title="删除文章"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>确定删除文章吗</p>
        </Modal>
      );
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <DirectoryTree
        style={{ height: window.innerHeight - 64 }}
        className={style.directoryTree}
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        titleRender={titleRender}
        treeData={treeData}
      />
      {renderModal()}
    </>
  );
};

export default DiretoryTree;
