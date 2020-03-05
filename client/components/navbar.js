import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, numOfItemsInCart}) => (
  <div>
    <nav>
      <div id="nav-left">
        <div id="logo">
          <h3>Grace Potter</h3>
        </div>
        <div>
          <h4>Category</h4>
        </div>
      </div>
      <div id="nav-right">
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
            <Link to="/login">Login</Link>
            <h5>or</h5>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <div>
          <h3 id="cart-num">{numOfItemsInCart}</h3>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </nav>
    <hr />
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
