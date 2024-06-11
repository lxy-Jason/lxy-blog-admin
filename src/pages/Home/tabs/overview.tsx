import ArticleList from '@/components/ArticleList';
import TipTitle from '@/components/TipTitle';
import { Area } from '@ant-design/plots';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { Spin } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import getData, { artcileData } from '../constants';
import style from '../index.less';
const { Statistic } = StatisticCard;
const OverView = () => {
  const [data, setData] = useState();
  const [articleData, setArticleData] = useState();

  const [loading, setLoading] = useState(true);
  const [responsive, setResponsive] = useState(false);
  const fetchData = useCallback(async () => {
    const { data: res } = getData;
    console.log(res);
    // @ts-ignore
    setData(res);
    const { data: res1 } = artcileData;
    // @ts-ignore
    setArticleData(res1);
  }, [setData]);
  useEffect(() => {
    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
    });
  }, [fetchData, setLoading]);

  const eachData = useMemo(() => {
    const res = [];
    // @ts-ignore
    for (const each of data?.viewer?.grid?.each || []) {
      res.push({
        date: each.date,
        访问量: each.visited,
        访客数: each.viewer,
      });
    }
    return res;
  }, [data]);

  const eachConfig = {
    data: eachData,
    xField: 'date',
    height: 400,
  };

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <Spin spinning={loading}>
        <ProCard
          split={responsive ? 'horizontal' : 'vertical'}
          bordered
          style={{ marginBottom: responsive ? 8 : 0 }}
        >
          <StatisticCard
            colSpan={responsive ? 24 : 6}
            statistic={{
              title: '文章数',
              value: data?.total?.articleNum || 0,
              layout: responsive ? 'horizontal' : 'vertical',
            }}
          />
          <StatisticCard
            colSpan={responsive ? 24 : 6}
            statistic={{
              title: '总字数',
              layout: responsive ? 'horizontal' : 'vertical',
              value: data?.total?.wordCount || 0,
            }}
          />

          <StatisticCard
            colSpan={responsive ? 24 : 6}
            statistic={{
              title: (
                <TipTitle
                  title="总访客数"
                  tip="以浏览器内缓存的唯一标识符为衡量标准计算全站独立访客的数量"
                />
              ),
              value: data?.viewer?.now?.visited || 0,
              layout: responsive ? 'horizontal' : 'vertical',
              description: (
                <Statistic
                  title="今日新增"
                  value={data?.viewer?.add?.visited || 0}
                  trend="up"
                />
              ),
            }}
          />
          <StatisticCard
            colSpan={responsive ? 24 : 6}
            statistic={{
              title: (
                <TipTitle
                  title="总访问数"
                  tip="以每一次页面的访问及跳转为衡量标准计算全站的访问数量"
                />
              ),
              layout: responsive ? 'horizontal' : 'vertical',
              value: data?.viewer?.now?.viewer || 0,
              description: (
                <Statistic
                  title="今日新增"
                  value={data?.viewer?.add?.viewer || 0}
                  trend="up"
                />
              ),
            }}
          />
        </ProCard>
        <ProCard
          split={responsive ? 'horizontal' : 'vertical'}
          bordered={responsive ? false : true}
          ghost={responsive ? true : false}
          style={{ marginBottom: responsive ? 8 : 0 }}
        >
          <ProCard
            ghost
            colSpan={responsive ? 24 : 12}
            style={{ marginBottom: responsive ? 8 : 0 }}
          >
            <StatisticCard
              title={
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>最近访问TOP</div>
                </div>
              }
              className={style['card-full-title']}
              chart={
                <div style={{ marginTop: -14 }}>
                  <ArticleList
                    showRecentViewTime
                    articles={articleData?.recentVisitArticles || []}
                  />
                </div>
              }
            />
          </ProCard>
          <ProCard ghost colSpan={responsive ? 24 : 12}>
            <StatisticCard
              title={
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>文章访问量TOP</div>
                </div>
              }
              className={style['card-full-title']}
              chart={
                <div style={{ marginTop: -14 }}>
                  <ArticleList
                    showViewerNum
                    articles={articleData?.topViewer || []}
                  />
                </div>
              }
            />
          </ProCard>
        </ProCard>
        <ProCard
          bordered={responsive ? false : true}
          split={responsive ? 'horizontal' : 'vertical'}
          ghost={responsive ? true : false}
        >
          <StatisticCard
            style={{ marginBottom: responsive ? 8 : 0 }}
            colSpan={!responsive ? 12 : 24}
            className={style['card-full-title']}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>访客数趋势图</div>
              </div>
            }
            chart={<Area yField="访客数" {...eachConfig} />}
          />

          <StatisticCard
            colSpan={!responsive ? 12 : 24}
            className={style['card-full-title']}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>访问量趋势图</div>
              </div>
            }
            chart={<Area yField="访问量" {...eachConfig} />}
          />
        </ProCard>
        <ProCard
          bordered={responsive ? false : true}
          split={responsive ? 'horizontal' : 'vertical'}
          ghost={responsive ? true : false}
        ></ProCard>
      </Spin>
    </RcResizeObserver>
  );
};

export default OverView;
