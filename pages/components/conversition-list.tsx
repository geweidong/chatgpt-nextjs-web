import React, { memo } from 'react'
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
    <div className="p-2.5 h-full overflow-x-scroll rounded-sm pb-14" style={{ backgroundColor: colorBgContainer }}>
      {dataSources.map(item => {
        return <Message key={item.text} inversion={item.inversion ?? false} text={item.text} dateTime={item.dateTime} />
      })}
    </div>
  )
}

export default memo(ConversitionList)
