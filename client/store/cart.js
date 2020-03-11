import axios from 'axios'
import history from '../history'
import {GET_USER, REMOVE_USER} from './user'

const GOT_CART = 'GOT_CART'
const LATEST_ORDER = 'LATEST_ORDER'
const GET_PAST_ORDERS = 'GET_PAST_ORDERS'

export const gotCart = products => ({
  type: GOT_CART,
  products
})

export const latestOrder = order => ({
  type: LATEST_ORDER,
  order
})

export const getPastOrders = pastOrders => ({
  type: GET_PAST_ORDERS,
  pastOrders
})

export const fetchPastOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/home')
      dispatch(getPastOrders(data))
    } catch (err) {
      console.log('Having trouble locating your past orders')
    }
  }
}

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

export const addToCart = (productId, newQty = 1) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/cart/${productId}`, {
        quantity: newQty
      })
      dispatch(gotCart(data))
    } catch (err) {
      console.log('not able to add to cart', err)
    }
  }
}

export const updateQty = (productId, newQty) => {
  return async dispatch => {
    try {
      const {data} = await axios.patch(`/api/cart/${productId}`, newQty)
      dispatch(gotCart(data))
    } catch (err) {
      console.log('not able to update quantity', err)
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
  latestOrder: {},
  pastOrders: []
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, products: action.products}
    case LATEST_ORDER:
      return {...state, products: [], latestOrder: action.order}
    case REMOVE_USER:
      return {...state, products: []}
    case GET_PAST_ORDERS:
      return {
        ...state,
        pastOrders: action.pastOrders
      }
    default:
      return state
  }
}
