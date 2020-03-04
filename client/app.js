import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {Route} from 'react-router-dom'
import singleProductConnect from './pages/singleProduct'
import ConnectedProductList from './pages/ProductList'

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/products" component={ConnectedProductList} />
      <Route
        exact
        path="/products/:productId"
        component={singleProductConnect}
      />
      <Routes />
    </div>
  )
}

export default App
