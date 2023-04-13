import React, { memo } from 'react'
import { Avatar, theme } from 'antd'
import { AliwangwangOutlined, SettingOutlined } from '@ant-design/icons'

const AvatarSetting = () => {
  const {
    token: { colorBgContainer, colorBgMask },
  } = theme.useToken()
  return (
    <div
      style={{ backgroundColor: colorBgContainer, boxShadow: '-8px 3px 9px ' + colorBgMask + '' }}
      className="absolute bottom-0 left-0 w-full h-14 flex items-center justify-between px-2.5 py-4"
    >
      <div className="flex items-center">
        <Avatar size={40} icon={<AliwangwangOutlined />} />
        <span className="ml-1.5 text-sm font-medium">weidongge</span>
      </div>
      <div className="flex items-center mr-1 cursor-pointer">
        <SettingOutlined size={20} />
      </div>
    </div>
  )
}

export default memo(AvatarSetting)
