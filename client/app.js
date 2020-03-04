import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {Route} from 'react-router-dom'
import SingleProductConnect from './pages/SingleProduct'
import ConnectedProductList from './pages/ProductList'

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
