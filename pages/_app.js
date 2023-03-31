import '@/styles/globals.css'
import '@/styles/markdown.scss'
import '@/styles/highlight.scss'
import '@/styles/custome.markdown.scss'
import React from 'react'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
