import { store } from '../store'
import { Provider } from 'react-redux'
import Layout from './Layout'

export default function Index() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  )
}
