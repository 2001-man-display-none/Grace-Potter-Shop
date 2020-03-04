import axios from 'axios'

const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
const GOT_ERROR = 'GOT_ERROR'

export const gotSingleProduct = singleProduct => {
  return {
    type: GOT_SINGLE_PRODUCT,
    singleProduct
  }
}

export const gotError = (error, failedAction) => ({
  type: GOT_ERROR,
  error,
  failedAction
})

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(gotSingleProduct(data))
    } catch (err) {
      dispatch(gotError(err, {type: GOT_SINGLE_PRODUCT}))
    }
  }
}

export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.singleProduct
    case GOT_ERROR:
      return action.error
    default:
      return state
  }
}
