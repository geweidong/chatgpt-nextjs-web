import React, { memo, useCallback, useState } from 'react'
import { Layout, Button, theme, ConfigProvider } from 'antd'
import ChatItemList from './chat-left-list'
import { useAppDispatch } from '../store/hooks'
import { addHistory, setActive } from '../store/modules/chat'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import ConversitionList from '@/pages/components/conversition-list'
import AvatarSetting from '@/pages/components/avatar-setting'
import InputContainer from '@/pages/components/input-container'

const { Content, Sider } = Layout

const LayoutContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const addChatItem = useCallback(() => {
    const id = Date.now()
    dispatch(
      addHistory({
        history: { title: 'New Chat', uuid: id, isEdit: false },
      }),
    )
    setActive(id)
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
          <div className="flex relative flex-col w-full h-full justify-between">
            <div className="w-full h-18 flex align-middle">
              <Button type="dashed" block onClick={addChatItem}>
                添加新的chats
              </Button>
            </div>
            <div className="flex-1 overflow-y-scroll w-full scrollbar-hide pt-2.5">
              <ChatItemList />
            </div>
          </div>
          <AvatarSetting />
        </Sider>
        <Layout style={{ height: '100vh' }}>
          <Content style={{ margin: '10px 10px 0', overflow: 'initial', position: 'relative' }}>
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
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
