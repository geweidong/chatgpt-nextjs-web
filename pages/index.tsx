import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('./components/layout'), {
  ssr: false, // 设置为false表示只在客户端渲染
})

export default function Home() {
  return (
    <>
      <Layout />
    </>
  )
}
