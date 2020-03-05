import React from 'react'
import {Route} from 'react-router-dom'

import Routes from './routes'
import {Navbar} from './components'
import SingleProductConnect from './pages/SingleProduct'
import ConnectedProductList from './pages/ProductList'

import './style.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/products" component={ConnectedProductList} />
      <Route
        exact
        path="/products/:productId"
        component={SingleProductConnect}
      />
      <Routes />
    </div>
  )
}

export default App
