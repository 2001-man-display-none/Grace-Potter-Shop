import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import userReducer from './user'
import {singleProductReducer} from './singleProduct'
import products from './products'
import cart from './cart'
import categories from './categories'

const reducer = combineReducers({
  user: userReducer,
  singleProduct: singleProductReducer,
  products,
  cart,
  categories
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
