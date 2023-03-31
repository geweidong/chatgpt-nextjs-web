import { RootState } from '@/pages/store'
import { useAppSelector } from '@/pages/store/hooks'

export const useGetChatByUuidAndIndex = (uuid: number, index: number) => {
  const state: RootState = useAppSelector(state => state)
  const chatIndex = state.chat.chat.findIndex(item => item.uuid === uuid)
  if (chatIndex !== -1) {
    return state.chat.chat[chatIndex].data[index]
  }
  return null
}
