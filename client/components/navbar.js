import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, numOfItemsInCart}) => (
  <div>
    <nav>
      <ul className="nav-left">
        <li id="logo">
          <img className="logo" src="/gp-home.png" />
        </li>
        <li>
          <h3>Grace Potter</h3>
        </li>
      </ul>
      <ul className="nav-center">
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
      <ul className="nav-right">
        {isLoggedIn ? (
          <>
            {/* The navbar will show these links after you log in */}
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
        <div>
          <div className="cart-info">
            <div className="cart-icon"></div>
            <div className="cart-num">{numOfItemsInCart}</div>
          </div>
          <Link to="/cart">Cart</Link>
        </div>
      </ul>
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
