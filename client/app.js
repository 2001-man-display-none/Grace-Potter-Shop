import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {Route} from 'react-router-dom'
import singleProductConnect from './components/singleProduct'

const App = () => {
  return (
    <div>
      <Navbar />
      <Route path="/product/:productId" component={singleProductConnect} />
      <Routes />
    </div>
  )
}

export default App
