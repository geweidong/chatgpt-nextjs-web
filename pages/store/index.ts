import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { reducer as chatReducer } from './modules/chat'

const rootReducer = combineReducers({
  chat: chatReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type RootDispatch = typeof store.dispatch
