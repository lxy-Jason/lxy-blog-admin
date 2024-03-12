import SiteInfoForm from './components/SiteInfoForm';
// import { getSiteInfo, updateSiteInfo } from '@/services/van-blog/api';
import { ProForm } from '@ant-design/pro-components';
import { Card, message, Modal } from 'antd';
import { useState } from 'react';
export default function () {
  const [tab, setTab] = useState('basic')
  const [form] = ProForm.useForm();
  const tabList = [
    {
      key: 'basic',
      tab: '基本设置',
    },
    {
      key: 'more',
      tab: '高级设置',
    }
  ];

  return (
    <Card tabList={tabList} onTabChange={setTab} activeTabKey={tab}>
      <ProForm
        form={form}
        grid={true}
        layout={'horizontal'}
        labelCol={{ span: 6 }}
        request={async () => {
          // const { data } = await getSiteInfo();
          const { data } = {data:{}};

          return data;
        }}
        syncToInitialValues={true}
        onFinish={async (data) => {
          let ok = true;
          try {
            new URL(data.baseUrl);
          } catch (err) {
            ok = false;
          }
          if (!data.baseUrl) {
            ok = true;
          }
          if (!ok) {
            Modal.warn({
              title: '网站 URL 不合法！',
              content: (
                <div>
                  <p>请输入包含完整协议的 URL</p>
                  <p>例: https://baidu.com</p>
                </div>
              ),
            });
            return;
          }
          // await updateSiteInfo(data);
          message.success('更新成功！');
        }}
      >
        <SiteInfoForm
          form={form}
          showLayout={tab === 'layout'}
          showOption={tab === 'more'}
          showRequire={tab === 'basic'}
          isInit={false}
        />
      </ProForm>
    </Card>
  );
}
