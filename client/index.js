import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {ToastProvider} from 'react-toast-notifications'

import history from './history'
import store from './store'
import CartToast from './components/CartToast'
import App from './app'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ToastProvider components={{Toast: CartToast}} placement="bottom-right">
        <App />
      </ToastProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
