import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'

const Index = dynamic(() => import('./components'), {
  ssr: false, // 设置为false表示只在客户端渲染
})

export default function Home() {
  return (
    <>
      <Index />
    </>
  )
}
