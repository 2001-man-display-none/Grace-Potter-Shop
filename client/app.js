import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import Footer from './components/Footer'

import './style.css'

const App = () => {
  return (
    <div id="main-wrapper">
      <Navbar />
      <main>
        <Routes />
      </main>
      <Footer />
    </div>
  )
}

export default App
