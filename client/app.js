import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Main from './components/main'

const App = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Routes />
    </div>
  )
}

export default App
