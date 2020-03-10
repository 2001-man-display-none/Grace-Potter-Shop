import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, checkout, fetchPastOrders} from '../store/cart'
import OrderHistory from '../pages/OrderHistory'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchPastOrdersDispatch()
  }

  render() {
    return (
      <div className="page page-home">
        <div>
          <h2>Welcome, {this.props.name}!</h2>
          <Link to="/home/editProfile">
            <h5>Edit Your Profile</h5>
          </Link>
          <h3>Your Order History below:</h3>
        </div>
        <div id="cart">
          {this.props.pastOrders.map(order => (
            <OrderHistory
              key={order.id}
              order={order}
              products={order.products}
            />
          ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const stateProps = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    cart: state.cart.products,
    pastOrders: state.cart.pastOrders
  }
}

const dispatchProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  checkout: id => dispatch(checkout(id)),
  fetchPastOrdersDispatch: () => dispatch(fetchPastOrders())
})

const ConnectedUserHome = connect(stateProps, dispatchProps)(UserHome)

export default ConnectedUserHome
