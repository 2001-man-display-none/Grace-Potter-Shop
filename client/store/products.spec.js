import {expect} from 'chai'
import {fetchAll, initialState} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('products reducer', () => {
  let store
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  describe('fetchAll', () => {
    it('dispatches the GOT PRODUCTS action on success', async () => {
      const fakeProducts = [{name: 'aloe vera'}]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(fetchAll())
      const lastAction = store.getActions()[0]
      expect(lastAction.type).to.be.equal('GOT_PRODUCTS')
      expect(lastAction.products).to.be.deep.equal(fakeProducts)
    })

    it('dispatches the GOT ERROR action on failure', async () => {
      mockAxios.onGet('/api/products').replyOnce(500)
      await store.dispatch(fetchAll())
      const lastAction = store.getActions()[0]
      expect(lastAction.type).to.be.equal('GOT_ERROR')
    })
  })
})
