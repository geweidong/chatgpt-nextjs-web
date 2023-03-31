import { RootState } from '@/pages/store'
import { useAppSelector } from '@/pages/store/hooks'

export const useGetChatByUuidAndIndex = (uuid: number, index: number) => {
  const chatState: Chat.ChatState = useAppSelector(state => state.chat)
  const chatIndex = chatState.chat.findIndex(item => item.uuid === uuid)
  if (chatIndex !== -1) {
    return chatState.chat[chatIndex].data[index]
  }
  return null
}

export const useGetChatByUuid = (uuid?: number) => {
  const chatState: Chat.ChatState = useAppSelector(state => state.chat)
  if (uuid) return chatState.chat.find(item => item.uuid === uuid)?.data ?? []
  return chatState.chat.find(item => item.uuid === chatState.active)?.data ?? []
}

export const useGetChatHistory = () => {
  const chatState: Chat.ChatState = useAppSelector(state => state.chat)
  return chatState.history ?? []
}

export const useGetChatActive = () => {
  const chatState: Chat.ChatState = useAppSelector(state => state.chat)
  return chatState.active ?? null
}

export const useGetAllState = () => {
  const state: RootState = useAppSelector(state => state)
  return state
}
