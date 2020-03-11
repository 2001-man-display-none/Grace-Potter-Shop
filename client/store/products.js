import axios from 'axios'

// ACTION TYPES
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_ERROR = 'GOT_ERROR'

// ACTION CREATORS
export const gotProducts = products => ({
  type: GOT_PRODUCTS,
  products
})

export const gotError = (error, failedAction) => ({
  type: GOT_ERROR,
  error,
  failedAction
})

// THUNK CREATORS
export const fetchAll = pageNum => async dispatch => {
  try {
    const res = await axios.get(`/api/products/?pageNum=&${pageNum}`)
    dispatch(gotProducts(res.data))
  } catch (err) {
    dispatch(gotError(err, {type: GOT_PRODUCTS}))
  }
}

// INITIAL STATE
export const initialState = {
  status: 'loading',
  products: []
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {...state, status: 'done', products: action.products}
    case GOT_ERROR:
      console.error(action.error)
      return {...state, status: 'error', products: []}
    default:
      return state
  }
}
