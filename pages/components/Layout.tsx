import React, { memo, useCallback } from 'react';
import { Layout, Menu, theme } from 'antd';
import styles from '@/styles/Layout.module.scss';
import ChatItemList from './chat-left-list';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { incrementByAmount } from '../store/counter';

const { Header, Content, Sider } = Layout;

const LayoutContainer: React.FC = () => {
  const counter = useAppSelector((state: RootState) => state.counter);
  const dispatch = useAppDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const addChatItem = useCallback(() => {
    dispatch(incrementByAmount(1));
  }, []);

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          padding: '10px 8px',
        }}
      >
        <div className={styles.siderContainer}>
          <div className={styles.addbtn} onClick={addChatItem} />
          <div className={styles.siderBar}>
            <ChatItemList />
            <>{counter.value}</>
          </div>
        </div>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            <p>long content</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(LayoutContainer);