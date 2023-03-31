import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultState } from './helper'

const initialState: Chat.ChatState = defaultState()

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatByUuid: (state, action: PayloadAction<{ uuid: number; chat: Chat.Chat }>) => {
      const { payload } = action
      const { uuid, chat } = payload
      if (!uuid || uuid === 0) {
        // 添加默认的新的chat
        const newUuid = 1002
        state.active = newUuid
        state.history.push({ uuid: newUuid, title: 'New Chat', isEdit: false })
        state.chat.push({ uuid: newUuid, data: [chat] })
        return
      }
      const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
      if (chatIndex !== -1) {
        state.chat[chatIndex].data.push(chat)
      }
    },
    addHistory: (state, action: PayloadAction<{ history: Chat.History; chatData: Chat.Chat[] }>) => {
      const { payload } = action
      const { history, chatData } = payload
      state.history.unshift(history)
      state.chat.unshift({ uuid: history.uuid, data: chatData })
      state.active = history.uuid
    },
    updateChatByUuid: (state, action: PayloadAction<{ uuid: number; index: number; chat: Chat.Chat }>) => {
      const { payload } = action
      const { uuid, index, chat } = payload
      if (!uuid || uuid === 0) {
        if (state.chat.length) {
          state.chat[0].data[index] = chat
        }
        return
      }

      const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
      if (chatIndex !== -1) {
        state.chat[chatIndex].data[index] = chat
      }
    },
    updateChatSomeByUuid: (state, action: PayloadAction<{ uuid: number; index: number; chat: Partial<Chat.Chat> }>) => {
      const { payload } = action
      const { uuid, index, chat } = payload
      if (!uuid || uuid === 0) {
        if (state.chat.length) {
          state.chat[0].data[index] = { ...state.chat[0].data[index], ...chat }
        }
        return
      }

      const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
      if (chatIndex !== -1) {
        state.chat[chatIndex].data[index] = { ...state.chat[chatIndex].data[index], ...chat }
      }
    },
    setActive: (state, action: PayloadAction<number>) => {
      const { payload } = action
      state.active = payload
    },
  },
})

export {
  useGetChatByUuidAndIndex,
  useGetChatByUuid,
  useGetChatHistory,
  useGetChatActive,
  useGetAllState,
} from './hooks'

export const { addChatByUuid, updateChatByUuid, updateChatSomeByUuid, setActive } = chatSlice.actions

export const reducer = chatSlice.reducer
