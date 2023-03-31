import React, { memo } from 'react'
import { Avatar, theme } from 'antd'
import { AliwangwangOutlined, SettingOutlined } from '@ant-design/icons'
import styles from '@/styles/Layout.module.scss'

const AvatarSetting = () => {
  const {
    token: { colorBgContainer, colorBgMask },
  } = theme.useToken()
  return (
    <div
      style={{ backgroundColor: colorBgContainer, boxShadow: '-8px 3px 9px ' + colorBgMask + '' }}
      className={styles.avatarSetting}
    >
      <div className={styles.avatar}>
        <Avatar size={40} icon={<AliwangwangOutlined />} />
        <span>weidongge</span>
      </div>
      <div className={styles.setting}>
        <SettingOutlined size={20} />
      </div>
    </div>
  )
}

export default memo(AvatarSetting)
