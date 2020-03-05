import axios from 'axios'

const GOT_CART = 'GOT_CART'

export const gotCart = products => ({
  type: GOT_CART,
  products
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
      const {data} = await axios.delete(
        `api/users/${state.user.id}/cart/${productId}`
      )
      dispatch(gotCart(data))
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
    default:
      return state
  }
}
