// import { getLog } from '@/services/van-blog/api';
import TerminalDisplay from '@/components/TerminalDisplay';
import { getLogData } from '@/services/api/meta';
import { Button, Card, Space, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
export default function () {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<any>();
  const domRef: React.RefObject<HTMLPreElement> = useRef(null);

  const fetchLog = async () => {
    try {
      const { data } = await getLogData('system', 1, 1000);
      const logString = data.data.reverse().join('\r\n');
      setContent(logString);
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchLog()
      .then(() => {
        setTimeout(() => {
          if (domRef.current) {
            domRef.current.scrollTop = domRef.current.scrollHeight;
          }
        }, 10);
      })
      .finally(() => {
        setLoading(false);
      });
    timerRef.current = setInterval(fetchLog, 5000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  return (
    <Card
      title="系统日志(每5秒自动刷新）"
      extra={
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setLoading(true);
              fetchLog().finally(() => {
                setLoading(false);
                setTimeout(() => {
                  if (domRef.current) {
                    domRef.current.scrollTop = domRef.current?.scrollHeight;
                  }
                }, 10);
              });
            }}
          >
            手动刷新
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading}>
        <pre
          ref={domRef}
          style={{
            maxHeight: 'calc(100vh - 250px)',
            height: 'calc(100vh - 250px)',
            minHeight: 'calc(100vh - 250px)',
            overflowY: 'auto',
          }}
        >
          <TerminalDisplay content={content} />
        </pre>
      </Spin>
    </Card>
  );
}
