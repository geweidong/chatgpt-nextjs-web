import '@/styles/globals.css'
import '@/styles/markdown.scss'
import '@/styles/highlight.scss'
import '@/styles/custome.markdown.scss'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
