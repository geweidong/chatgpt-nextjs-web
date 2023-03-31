import React, { memo } from 'react'
import styles from '@/styles/Layout.module.scss'
import { theme } from 'antd'
import Message from '@/pages/components/message'

const ConversitionList = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const mockText =
    "以下是一个简单的JavaScript代码示例，用于在页面上创建一个按钮，并在按钮上添加一个点击事件监听器：\n\n```js\nconst button = document.createElement('button');\nbutton.textContent = 'Click me';\n\nbutton.addEventListener('click', event => {\n  console.log('Button clicked!');\n});\n\ndocument.body.appendChild(button);\n```\n\n这段代码使用`document.createElement()`方法创建了一个新的`<button>`元素，并设置了其文本内容。然后，使用`addEventListener()`方法给按钮添加了一个点击事件监听器，并在点击时将一条消息记录到控制台中。最后，使用`document.body.appendChild()`方法将按钮添加到页面的主体中。\n\n当页面加载完毕后，运行这段代码就可以在页面上创建一个新的按钮，并在点击该按钮时将一条消息打印到控制台中。"

  return (
    <div className={styles.conversitionList} style={{ backgroundColor: colorBgContainer }}>
      <Message inversion={false} text={mockText} />
      <Message inversion text="这是一段简单的藐视" />
      <Message inversion={false} text={mockText} />
      <Message inversion text="这是一段简单的藐视" />
      <Message inversion={false} text={mockText} />
      <Message inversion text="这是一段简单的藐视" />
      <Message inversion={false} text={mockText} />
      <Message inversion text="这是一段简单的藐视" />
    </div>
  )
}

export default memo(ConversitionList)
