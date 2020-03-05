import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, numOfItemsInCart}) => (
  <div>
    <nav>
      <div className="nav-left">
        <div id="logo">
          <img src="/gp-home.png" />
          <h3>Grace Potter</h3>
        </div>
      </div>
      <div className="nav-center">
        <h4>Category</h4>
      </div>
      <div className="nav-right">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link> <span>or</span>{' '}
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <div>
          <h3 id="cart-num">{numOfItemsInCart}</h3>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    numOfItemsInCart: state.cart.products.length
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
