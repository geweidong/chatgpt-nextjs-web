import React, { memo, useCallback, useState } from 'react'
import classnames from 'classnames'
import { theme, Input } from 'antd'
import { AliwangwangOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from '@/styles/Layout.module.scss'

const ChatItemList = () => {
  const {
    token: { colorPrimaryTextActive, colorTextSecondary, colorBgLayout },
  } = theme.useToken()
  const list = [
    {
      id: 1,
      text: '说的分手发水电费舒服',
    },
    {
      id: 2,
      text: '水电费大量的劳动力',
    },
    {
      id: 3,
      text: 'll',
    },
    {
      id: 4,
      text: '都大大方方',
    },
    ...Array.from({ length: 10 }, (v, k) => k).map(item => {
      return {
        id: item + 5,
        text: `第${item + 5}个`,
      }
    }),
  ]
  const [currentTab, setCurrentTab] = useState(list[0].id)
  const changeCurrentHistory = useCallback(
    (id: number) => {
      if (currentTab === id) return
      window.history.pushState({}, '', `?id=${id}`)
      setCurrentTab(id)
    },
    [currentTab],
  )

  return (
    <div>
      {list.map(item => {
        return (
          <div
            onClick={() => changeCurrentHistory(item.id)}
            key={item.id}
            className={classnames({
              [styles.historyItem]: true,
              [styles.active]: currentTab === item.id,
              boxShadowSecondary: currentTab === item.id,
            })}
            style={{
              color: currentTab === item.id ? colorPrimaryTextActive : colorTextSecondary,
              borderColor: currentTab === item.id ? colorPrimaryTextActive : colorBgLayout,
            }}
          >
            <div className={styles.leftText}>
              <AliwangwangOutlined />
              <div className={styles.text}>
                <span>{item.text}</span>
                {/* <Input value={item.text} /> */}
              </div>
            </div>
            {currentTab === item.id && (
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
