import React, { useEffect, useState, memo } from 'react'
import Image from 'next/image'
import { theme } from 'antd'
import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

const mdi = new MarkdownIt({
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
mdi.use(mdKatex, { blockClass: '', errorColor: ' #cc0000' })

const Message = ({
  text = "以下是一个简单的JavaScript代码示例，用于在页面上创建一个按钮，并在按钮上添加一个点击事件监听器：\n\n```js\nconst button = document.createElement('button');\nbutton.textContent = 'Click me';\n\nbutton.addEventListener('click', event => {\n  console.log('Button clicked!');\n});\n\ndocument.body.appendChild(button);\n```\n\n这段代码使用`document.createElement()`方法创建了一个新的`<button>`元素，并设置了其文本内容。然后，使用`addEventListener()`方法给按钮添加了一个点击事件监听器，并在点击时将一条消息记录到控制台中。最后，使用`document.body.appendChild()`方法将按钮添加到页面的主体中。\n\n当页面加载完毕后，运行这段代码就可以在页面上创建一个新的按钮，并在点击该按钮时将一条消息打印到控制台中。",
  inversion = false,
  dateTime = '',
}: {
  text: string
  inversion: boolean
  dateTime: string
}) => {
  const {
    token: { colorTextQuaternary, colorFillTertiary, colorInfoBgHover },
  } = theme.useToken()
  const [textContent, setTextContent] = useState('')
  useEffect(() => {
    const value = text ?? ''
    setTextContent(mdi.render(value))
  }, [text])

  return (
    <div className="mb-5 flex items-start" style={{ flexDirection: inversion ? 'row-reverse' : 'row' }}>
      <div
        className="w-10 h-10 overflow-hidden rounded-full"
        style={{ marginLeft: inversion ? 5 : 0, marginRight: inversion ? 0 : 5 }}
      >
        <Image src={inversion ? '/favicon.ico' : '/pwa-192x192.png'} width={40} height={40} alt="" />
      </div>
      <div className="flex flex-col ml-1.5">
        <div className="mb-1 text-xs" style={{ color: colorTextQuaternary, textAlign: inversion ? 'right' : 'left' }}>
          {dateTime}
        </div>
        <div className="p-1.5 rounded-sm" style={{ backgroundColor: inversion ? colorInfoBgHover : colorFillTertiary }}>
          <div>
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: textContent }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Message)
