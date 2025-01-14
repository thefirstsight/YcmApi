import {PageContainer} from '@ant-design/pro-components';

import React, {useEffect, useState} from 'react';
import {List, message, Skeleton} from "antd";
import {listInterfaceInfoByPageUsingGet} from "@/services/YcmApi-backend/interfceInfoController";

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0)

  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGet({current, pageSize});
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败, ' + error.message);
      return false;
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <PageContainer title="在线接口开放平台">
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => {
          const apiLink = `/interface_info/${item.id}`;
          return (
            <List.Item
              actions={[<a key="list-loadmore-edit" href={apiLink}>查看</a>]}
            >
              <List.Item.Meta
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}
              />
              <div>content</div>
            </List.Item>
          )
        }
        }
        pagination={
          {
            pageSize: 10,
            total,
            onChange(page, pageSize) {
              loadData(page, pageSize);
            }
          }
        }
      />
    </PageContainer>
  );
};

export default Index;
