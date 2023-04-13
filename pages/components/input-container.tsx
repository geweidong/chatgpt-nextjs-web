import React, { memo, useCallback, useState } from 'react'
import { Input, theme, Button } from 'antd'
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { fetchChatAPIProcess } from '@/pages/request'
import { getDataFromUrl } from '@/pages/api/utils'
import { useAppDispatch } from '@/pages/store/hooks'
import {
  addChatByUuid,
  useGetChatByUuidAndIndex,
  useGetChatByUuid,
  updateChatByUuid,
  updateChatSomeByUuid,
} from '@/pages/store/modules/chat'

let controller = new AbortController()

const InputContainer = () => {
  const dispatch = useAppDispatch()
  const [disabled, setDisabled] = useState(true)
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const uuid = getDataFromUrl('id') || 0

  const dataSources = useGetChatByUuid(+uuid)
  const currentChat = useGetChatByUuidAndIndex(+uuid, dataSources.length - 1)
  const conversitionList = dataSources.filter(item => !item.inversion && !item.error)

  const onprocess = useCallback(
    async ({
      text,
      prompt,
      messageId,
      options,
    }: {
      text: string
      prompt: string
      messageId: string
      options: Chat.ConversationRequest
    }) => {
      dispatch(
        updateChatByUuid({
          uuid: +uuid,
          chat: {
            dateTime: new Date().toLocaleString(),
            text,
            inversion: false,
            error: false,
            loading: false,
            messageId: messageId,
            requestOptions: { prompt, options: { ...options } },
          },
        }),
      )
    },
    [dataSources.length],
  )

  const fetchApi = async (prompt: string) => {
    controller = new AbortController()
    setLoading(true)
    dispatch(
      addChatByUuid({
        uuid: +uuid,
        chat: {
          dateTime: new Date().toLocaleString(),
          text: prompt,
          inversion: true,
          error: false,
          messageId: undefined,
          requestOptions: { prompt, options: null },
        },
      }),
    )

    const options: Chat.ConversationRequest = {}
    if (conversitionList.length > 0) {
      const parentMessageId = conversitionList[conversitionList.length - 1].messageId
      if (parentMessageId) options.parentMessageId = parentMessageId
    }

    dispatch(
      addChatByUuid({
        uuid: +uuid,
        chat: {
          dateTime: new Date().toLocaleString(),
          text: '',
          inversion: false,
          error: false,
          loading: true,
          messageId: undefined,
          requestOptions: { prompt, options: { ...options } },
        },
      }),
    )

    try {
      const lastText = ''
      const fetchChatAPIOnce = async () => {
        await fetchChatAPIProcess<Chat.ConversationResponse>({
          prompt,
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

              onprocess({
                text: lastText + data.text ?? '',
                prompt,
                messageId: data.id,
                options,
              })
            } catch (error) {}
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
          chat: {
            dateTime: new Date().toLocaleString(),
            text: errorMessage,
            inversion: false,
            error: true,
            loading: false,
            messageId: undefined,
            requestOptions: { prompt, options: { ...options } },
          },
        }),
      )
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = useCallback(() => {
    fetchApi(value)
  }, [fetchApi, value])

  const onPressEnter = useCallback(
    (_e: React.KeyboardEvent<HTMLInputElement>) => {
      if (loading) return
      onSubmit()
      setTimeout(() => {
        setValue('')
      }, 30)
    },
    [loading, onSubmit],
  )

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setValue(value)
    if (value) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [])

  const abortRequest = useCallback(() => {
    controller.abort()
  }, [])

  return (
    <div
      className="absolute bottom-0 left-0 w-full h-16 p-3 flex items-center"
      style={{ backgroundColor: colorBgContainer }}
    >
      {loading && (
        <Button onClick={abortRequest} icon={<CloseCircleOutlined />}>
          取消
        </Button>
      )}
      <Input value={value} onChange={onChange} onPressEnter={onPressEnter} placeholder="请输入内容" />
      <Button className="ml-2" onClick={onSubmit} disabled={disabled} type="primary" icon={<SearchOutlined />}>
        提交
      </Button>
    </div>
  )
}

export default memo(InputContainer)
