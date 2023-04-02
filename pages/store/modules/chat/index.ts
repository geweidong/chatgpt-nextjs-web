import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLocalState, setLocalState, defaultState } from './helper'

const initialState: Chat.ChatState = typeof window !== undefined ? getLocalState() : defaultState()

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatByUuid: (state, action: PayloadAction<{ uuid: number; chat: Chat.Chat }>) => {
      const { payload } = action
      const { uuid, chat } = payload
      if (!uuid || uuid === 0) {
        if (state.history.length === 0) {
          const newUuid = 1002
          state.active = newUuid
          state.history.push({ uuid: newUuid, title: 'New Chat', isEdit: false })
          state.chat.push({ uuid: newUuid, data: [chat] })
        } else {
          state.chat[0].data.push(chat)
          if (state.history[0].title === 'New Chat') {
            state.history[0].title = chat.text
          }
        }
      }
      const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
      if (chatIndex !== -1) {
        state.chat[chatIndex].data.push(chat)
        if (state.history[chatIndex].title === 'New Chat') {
          state.history[chatIndex].title = chat.text
        }
      }

      setLocalState(state)
    },
    addHistory: (state, action: PayloadAction<{ history: Chat.History; chat?: Chat.Chat[] }>) => {
      const { payload } = action
      const { history, chat = [] } = payload
      state.history.unshift(history)
      state.chat.unshift({ uuid: history.uuid, data: chat })
      state.active = history.uuid
      setLocalState(state)
    },
    updateChatByUuid: (state, action: PayloadAction<{ uuid: number; chat: Chat.Chat }>) => {
      const { payload } = action
      const { uuid, chat } = payload

      if (!uuid || uuid === 0) {
        if (state.chat.length > 0) {
          const index = state.chat[0].data.length - 1
          state.chat[0].data[index] = chat
        }
      }

      const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
      if (chatIndex !== -1) {
        const index = state.chat[chatIndex].data.length - 1
        state.chat[chatIndex].data[index] = chat
      }
      setLocalState(state)
    },
    updateChatSomeByUuid: (state, action: PayloadAction<{ uuid: number; chat: Partial<Chat.Chat> }>) => {
      const { payload } = action
      const { uuid, chat } = payload
      if (!uuid || uuid === 0) {
        if (state.chat.length) {
          const index = state.chat[0].data.length - 1
          state.chat[0].data[index] = { ...state.chat[0].data[index], ...chat }
        }
      }

      const chatIndex = state.chat.findIndex(item => item.uuid === uuid)
      if (chatIndex !== -1) {
        const index = state.chat[chatIndex].data.length - 1
        state.chat[chatIndex].data[index] = { ...state.chat[chatIndex].data[index], ...chat }
      }
      setLocalState(state)
    },
    setActive: (state, action: PayloadAction<number>) => {
      const { payload } = action
      state.active = payload
      setLocalState(state)
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

export const { addChatByUuid, updateChatByUuid, updateChatSomeByUuid, setActive, addHistory } = chatSlice.actions

export const reducer = chatSlice.reducer
