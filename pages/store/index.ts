import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { reducer as counterReducer } from './counter';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type RootDispatch = typeof store.dispatch;

