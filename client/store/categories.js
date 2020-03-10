import axios from 'axios'
import {combineReducers} from 'redux'

const GOT_MENU = 'GOT_MENU'
const GOT_CATEGORIES = 'GOT_CATEGORIES'
const GOT_SINGLE_CATEGORY = 'GOT_SINGLE_CATEGORY'
const SELECT_CATEGORY = 'SELECT_CATEGORY'

const STATUS_ERROR = 'error'
const STATUS_DONE = 'done'
const STATUS_LOADING = 'loading'

export const gotMenu = (categories, error) => ({
  type: GOT_MENU,
  categories,
  error
})

export const gotCategories = (categories, error) => ({
  type: GOT_CATEGORIES,
  categories,
  error
})

export const selectCategory = slug => ({
  type: SELECT_CATEGORY,
  slug
})

export const gotSingleCategory = (category, error) => ({
  type: GOT_SINGLE_CATEGORY,
  category,
  error
})

// THUNK CREATORS

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/categories')
      dispatch(gotCategories(data))
    } catch (error) {
      dispatch(gotCategories(null, error))
    }
  }
}

export const fetchMenu = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/categories/menu')
      dispatch(gotMenu(data))
    } catch (error) {
      dispatch(gotMenu(null, error))
    }
  }
}

export const fetchSingleCategory = slug => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/categories/${slug}`)
      dispatch(gotSingleCategory(data))
    } catch (error) {
      dispatch(gotSingleCategory(null, error))
    }
  }
}

// REDUCER(S)

const initialState = {
  categories: {status: STATUS_LOADING, value: []},
  menu: {status: STATUS_LOADING, value: []},
  currentCategory: {status: STATUS_LOADING, slug: '', value: {}}
}

const categoriesReducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return {
        ...state,
        status: action.error ? STATUS_ERROR : STATUS_DONE,
        value: action.categories,
        error: action.error
      }
    default:
      return state
  }
}

const menuReducer = (state = initialState.menu, action) => {
  switch (action.type) {
    case GOT_MENU:
      return {
        ...state,
        status: action.error ? STATUS_ERROR : STATUS_DONE,
        value: action.categories,
        error: action.error
      }
    default:
      return state
  }
}

const currentCategoryReducer = (
  state = initialState.currentCategory,
  action
) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        status: STATUS_LOADING,
        slug: action.slug
      }
    case GOT_SINGLE_CATEGORY:
      if (action.category.slug !== state.slug) {
        // This can happen if a user clicks a second category before
        // the first one loads. In that case we just want to ignore
        // the response for the old no-longer-selected category.
        return state
      } else {
        return {
          ...state,
          status: action.error ? STATUS_ERROR : STATUS_DONE,
          value: action.category,
          error: action.error
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  categories: categoriesReducer,
  menu: menuReducer,
  currentCategory: currentCategoryReducer
})
