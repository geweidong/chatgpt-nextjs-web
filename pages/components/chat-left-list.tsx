import React, { memo, useCallback, useState } from 'react'
import classnames from 'classnames'
import { theme } from 'antd'
import { useAppDispatch } from '../store/hooks'
import { AliwangwangOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from '@/styles/Layout.module.scss'
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

  return (
    <div>
      {list.map(item => {
        return (
          <div
            onClick={() => changeCurrentHistory(item.uuid)}
            key={item.uuid}
            className={classnames({
              [styles.historyItem]: true,
              [styles.active]: currentTab === item.uuid,
              boxShadowSecondary: currentTab === item.uuid,
            })}
            style={{
              color: currentTab === item.uuid ? colorPrimaryTextActive : colorTextSecondary,
              borderColor: currentTab === item.uuid ? colorPrimaryTextActive : colorBgLayout,
            }}
          >
            <div className={styles.leftText}>
              <AliwangwangOutlined />
              <div className={styles.text}>
                <span>{item.title}</span>
                {/* <Input value={item.text} /> */}
              </div>
            </div>
            {currentTab === item.uuid && (
              <div className={styles.rightIcons}>
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
