import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import dynamic from 'next/dynamic'
import { store } from './store'

const Layout = dynamic(() => import('./components/layout'), {
  ssr: false, // 设置为false表示只在客户端渲染
})

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Layout />
      </Provider>
    </>
  )
}
