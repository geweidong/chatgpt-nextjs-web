import React, { memo } from 'react'
import styles from '@/styles/Layout.module.scss'
import { theme } from 'antd'
import Message from '@/pages/components/message'
import { useGetChatByUuid, useGetChatActive } from '@/pages/store/modules/chat'

const ConversitionList = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const uuid = useGetChatActive()
  const dataSources = useGetChatByUuid(uuid || 0)

  return (
    <div className={styles.conversitionList} style={{ backgroundColor: colorBgContainer }}>
      {dataSources.map(item => {
        return <Message key={item.dateTime} inversion={item.inversion ?? false} text={item.text} />
      })}
    </div>
  )
}

export default memo(ConversitionList)
