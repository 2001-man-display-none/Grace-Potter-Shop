import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

class OrderConfirmation extends React.Component {
  total(cart) {
    return cart
      .map(item => item.price * item.order_item.quantity)
      .reduce((x, y) => {
        return x + y
      }, 0)
      .toFixed(2)
  }

  render() {
    let order = this.props.order
    let guest = 'there'
    if (order.id) {
      return (
        <div>
          <h1>Hey {this.props.user.name || guest},</h1>
          <div id="confirmation-page">
            <img id="check-mark" src="/green-check-mark.png"></img>
            <h2> Your order is confirmed!</h2>
          </div>
          <h3>
            Thanks for shopping at Grace Potter. Your order is on the way!
          </h3>
          <h3>Order Confirmation Number:&nbsp;{order.id}</h3>
          {order.products.map(item => (
            <div key={item.id} id="confirmation-tile">
              <ul>
                {/* <img src={item.image}></img> */}
                <li>{item.name}</li>
                <p>Quantity: {item.order_item.quantity}</p>
                <p>
                  Subtotal: ${item.price * item.order_item.quantity.toFixed(2)}{' '}
                </p>
              </ul>
            </div>
          ))}
          <div>
            <h3>Total: ${this.total(order.products)}</h3>
            <Link to="/home">Return to homepage</Link>
          </div>
        </div>
      )
    } else {
      return <Redirect to="/home" />
    }
  }
}

const stateProps = state => ({
  user: state.user,
  order: state.cart.latestOrder
})

const dispatchProps = dispatch => ({
  meDispatch: () => dispatch(me())
})

const ConnectedOrderConfirmation = connect(
  stateProps,
  dispatchProps
)(OrderConfirmation)

export default ConnectedOrderConfirmation
