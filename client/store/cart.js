import axios from 'axios'
import history from '../history'

const GOT_CART = 'GOT_CART'
const LATEST_ORDER = 'LATEST_ORDER'

export const gotCart = products => ({
  type: GOT_CART,
  products
})

export const latestOrder = order => ({
  type: LATEST_ORDER,
  order
})

export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(gotCart(data))
    } catch (error) {
      console.log('Something went wrong')
    }
  }
}

export const checkout = (redirect = '/confirmation') => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart/checkout')
      dispatch(latestOrder(data))
      history.push(redirect)
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteItemThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${productId}`)
      dispatch(gotCart(data))
    } catch (error) {
      console.log('Delete Thunk went wrong')
    }
  }
}

// INITIAL STATE
export const initialState = {
  products: [],
  latestOrder: {}
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, products: action.products}
    case LATEST_ORDER:
      return {...state, products: [], latestOrder: action.order}
    default:
      return state
  }
}
