import axios from 'axios'

const GOT_CART = 'GOT_CART'
const DELETE_ITEM = 'DELETE_ITEM'

export const gotCart = products => ({
  type: GOT_CART,
  products
})

export const deleteItem = id => ({
  type: DELETE_ITEM,
  id
})

export const fetchCart = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const {data} = await axios.get(`api/users/${state.user.id}/cart`)
      dispatch(gotCart(data))
    } catch (error) {
      console.log('Something went wrong')
    }
  }
}

export const deleteItemThunk = productId => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      await axios.delete(`api/users/${state.user.id}/cart/${productId}`)
      console.log(productId)
      dispatch(deleteItem(productId))
    } catch (error) {
      console.log('Delete Thunk went wrong')
    }
  }
}

// INITIAL STATE
export const initialState = {
  products: []
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, products: action.products}
    case DELETE_ITEM: {
      console.log(state)
      const remainingItems = state.products.filter(
        item => item.id !== action.id
      )
      return {...state, products: remainingItems}
    }
    default:
      return state
  }
}
