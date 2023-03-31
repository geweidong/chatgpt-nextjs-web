import React, { memo, useCallback, useMemo, useState } from 'react'
import { Input, theme, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { fetchChatAPIProcess } from '@/pages/request'
import styles from '@/styles/Layout.module.scss'
import { useAppDispatch } from '../store/hooks'
import { useRouter } from 'next/router'
import {
  addChatByUuid,
  useGetChatByUuidAndIndex,
  useGetChatByUuid,
  updateChatByUuid,
  updateChatSomeByUuid,
} from '../store/modules/chat'

let controller = new AbortController()

const InputContainer = () => {
  const dispatch = useAppDispatch()
  const [disabled, setDisabled] = useState(true)
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const router = useRouter()
  const { id } = router.query
  const uuid = id as unknown as number

  const dataSources = useGetChatByUuid(uuid)
  // const conversationList = useMemo(() => dataSources.filter(item => (!item.inversion && !item.error)), [dataSources]);
  const currentChat = useGetChatByUuidAndIndex(+uuid, dataSources.length - 1)

  const fetchApi = useCallback(async (prompt: string) => {
    controller = new AbortController()
    setLoading(true)
    dispatch(
      addChatByUuid({
        uuid,
        chat: {
          dateTime: new Date().toLocaleString(),
          text: value,
          inversion: true,
          error: false,
          parentMessageId: undefined,
          requestOptions: { prompt: value, options: null },
        },
      }),
    )

    const options: Chat.ConversationRequest = {}

    try {
      const lastText = ''
      const fetchChatAPIOnce = async () => {
        await fetchChatAPIProcess<Chat.ConversationResponse>({
          prompt: value,
          options,
          signal: controller.signal,
          onDownloadProgress: ({ event }) => {
            const xhr = event.target
            const { responseText } = xhr
            const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2)
            let chunk = responseText
            if (lastIndex !== -1) chunk = responseText.substring(lastIndex)
            try {
              const data = JSON.parse(chunk)
              dispatch(
                updateChatByUuid({
                  uuid: +uuid,
                  index: dataSources.length - 1,
                  chat: {
                    dateTime: new Date().toLocaleString(),
                    text: lastText + data.text ?? '',
                    inversion: false,
                    error: false,
                    loading: false,
                    parentMessageId: data.id,
                    requestOptions: { prompt: value, options: { ...options } },
                  },
                }),
              )
            } catch (error) {
              //
            }
          },
        })
      }

      await fetchChatAPIOnce()
    } catch (error: any) {
      const errorMessage = error?.message ?? '未知错误'

      if (error.message === 'canceled') {
        dispatch(
          updateChatSomeByUuid({
            uuid: +uuid,
            index: dataSources.length - 1,
            chat: {
              loading: false,
            },
          }),
        )
        return
      }

      if (currentChat?.text && currentChat.text !== '') {
        dispatch(
          updateChatSomeByUuid({
            uuid: +uuid,
            index: dataSources.length - 1,
            chat: {
              text: `${currentChat.text}\n[${errorMessage}]`,
              error: false,
              loading: false,
            },
          }),
        )
        return
      }
      dispatch(
        updateChatByUuid({
          uuid: +uuid,
          index: dataSources.length - 1,
          chat: {
            dateTime: new Date().toLocaleString(),
            text: errorMessage,
            inversion: false,
            error: true,
            loading: false,
            parentMessageId: undefined,
            requestOptions: { prompt: value, options: { ...options } },
          },
        }),
      )
    } finally {
      setLoading(false)
    }
  }, [])

  const onSubmit = useCallback(() => {
    fetchApi(value)
  }, [value])

  const onPressEnter = useCallback((_e: React.KeyboardEvent<HTMLInputElement>) => {
    if (loading) return
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
