import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log('incrementByAmount-action.payload', state, action)
      state.value += action.payload
    },
  },
})

export const { increment, incrementByAmount } = counterSlice.actions

export const reducer = counterSlice.reducer
