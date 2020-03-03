import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

const setSingleProduct = singleProduct => {
  return {
    type: SET_SINGLE_PRODUCT,
    singleProduct
  }
}

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/product/${productId}`)
      dispatch(setSingleProduct(data))
    } catch (err) {
      console.log('there is an error in fetching single product', err)
    }
  }
}

export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
