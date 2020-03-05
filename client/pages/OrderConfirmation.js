import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

class OrderConfirmation extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div>
        <h1>Hey {this.props.user.name},</h1>
        <div id="confirmation-page">
          <img id="check-mark" src="/green-check-mark.png"></img>
          <h2> Your order is confirmed!</h2>
        </div>
        <p>Thanks for shopping at Grace Potter. Your order is on the way! </p>
        {this.props.cartItems.map(item => (
          <div key={item.id} id="confirmation-tile">
            <ul>
              {/* <img src={item.image}></img> */}
              <li>{item.name}</li>
            </ul>
          </div>
        ))}

        <div>
          <h3>Your Total: $</h3>
          <Link to="/home">Return to homepage</Link>
        </div>
      </div>
    )
  }
}

const stateProps = state => ({
  user: state.user,
  cartItems: state.cart.products
})

const dispatchProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

const ConnectedOrderConfirmation = connect(
  stateProps,
  dispatchProps
)(OrderConfirmation)

export default ConnectedOrderConfirmation
