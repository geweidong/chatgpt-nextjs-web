import React, { memo, useCallback, useState } from 'react'
import { Layout, Button, theme, ConfigProvider } from 'antd'
import styles from '@/styles/Layout.module.scss'
import ChatItemList from './chat-left-list'
import { useAppDispatch } from '../store/hooks'
import { incrementByAmount } from '../store/counter'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import ConversitionList from '@/pages/components/conversition-list'
import AvatarSetting from '@/pages/components/avatar-setting'
import InputContainer from '@/pages/components/input-container'

const { Header, Content, Sider } = Layout

const LayoutContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const addChatItem = useCallback(() => {
    dispatch(incrementByAmount(1))
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout hasSider>
        <Sider
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          trigger={null}
          width={250}
          onBreakpoint={broken => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
          theme="light"
          style={{
            height: '100vh',
            padding: '10px 8px',
          }}
        >
          <div className={styles.siderContainer}>
            <div className={styles.addbtn}>
              <Button type="dashed" block>
                添加新的chats
              </Button>
            </div>
            <div className={styles.siderBar}>
              <ChatItemList />
            </div>
          </div>
          <AvatarSetting />
        </Sider>
        <Layout style={{ height: '100vh' }}>
          <Content style={{ margin: '10px 10px 0', overflow: 'initial', position: 'relative' }}>
            <div className={styles.collapsedIcon}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>
            <ConversitionList />
            <InputContainer />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default memo(LayoutContainer)
