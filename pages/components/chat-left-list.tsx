import React, { memo, useCallback, useEffect, useState } from 'react'
import classnames from 'classnames'
import { theme } from 'antd'
import { useAppDispatch } from '../store/hooks'
import { AliwangwangOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useGetChatHistory, useGetChatActive, setActive, useGetAllState } from '@/pages/store/modules/chat'

const ChatItemList = () => {
  const {
    token: { colorPrimaryTextActive, colorTextSecondary, colorBgLayout },
  } = theme.useToken()
  const dispatch = useAppDispatch()
  const list = useGetChatHistory()
  const active = useGetChatActive()
  const allData = useGetAllState()
  console.log(allData, '所有的state')

  const [currentTab, setCurrentTab] = useState(active)
  const changeCurrentHistory = useCallback(
    (id: number) => {
      if (currentTab === id) return
      window.history.pushState({}, '', `?id=${id}`)
      setCurrentTab(id)
      dispatch(setActive(id))
    },
    [currentTab],
  )

  useEffect(() => {
    setCurrentTab(active)
  }, [active])

  return (
    <div>
      {list.map(item => {
        return (
          <div
            onClick={() => changeCurrentHistory(item.uuid)}
            key={item.uuid}
            className={`flex justify-between w-full h-10 mb-2 hover:bg-gray-100 items-center cursor-pointer px-2 border-slate-500 border border-solid ${
              currentTab === item.uuid ? 'bg-gray-100' : 'bg-white'
            }`}
            style={{
              color: currentTab === item.uuid ? colorPrimaryTextActive : colorTextSecondary,
              borderColor: currentTab === item.uuid ? colorPrimaryTextActive : colorBgLayout,
            }}
          >
            <div className="flex items-center">
              <AliwangwangOutlined />
              <div className="ml-1 h-23">
                <span>{item.title}</span>
                {/* <Input value={item.text} /> */}
              </div>
            </div>
            {currentTab === item.uuid && (
              <div className="flex items-center">
                <EditOutlined onClick={() => console.log(888)} />
                <DeleteOutlined style={{ marginLeft: 6 }} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default memo(ChatItemList)
