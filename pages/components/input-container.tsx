import React, { memo, useCallback, useState } from 'react'
import { Input, theme, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { fetchChatAPIProcess } from '@/pages/request'
import styles from '@/styles/Layout.module.scss'

const InputContainer = () => {
  const [disabled, setDisabled] = useState(true)
  const [value, setValue] = useState<string>('')
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const fetchApi = useCallback((prompt: string) => {
    try {
      fetchChatAPIProcess({
        prompt,
        options: {},
        onDownloadProgress: ({ event }) => {
          const xhr = event.target
          const { responseText } = xhr
          console.log(responseText)
        },
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const onSubmit = useCallback(() => {
    fetchApi(value)
  }, [value])

  const onPressEnter = useCallback((_e: React.KeyboardEvent<HTMLInputElement>) => {
    onSubmit()
    setTimeout(() => {
      setValue('')
    }, 0)
  }, [])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setValue(value)
    if (value) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [])

  return (
    <div className={styles.inputWrapper} style={{ backgroundColor: colorBgContainer }}>
      <Input onChange={onChange} onPressEnter={onPressEnter} placeholder="请输入内容" />
      <Button onClick={onSubmit} disabled={disabled} type="primary" icon={<SearchOutlined />} style={{ marginLeft: 8 }}>
        提交
      </Button>
    </div>
  )
}

export default memo(InputContainer)
