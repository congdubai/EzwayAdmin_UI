import ReactDOM from 'react-dom/client'
import App from '@/App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { App as AntdApp } from 'antd'   // 👈 import Ant Design App

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AntdApp>     {/* 👈 bọc App của bạn bên trong Antd App */}
      <App />
    </AntdApp>
  </Provider>
)