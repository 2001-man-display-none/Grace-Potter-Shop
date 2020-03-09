import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

const OrderConfirmation = props => {
  if (props.order.id) {
    return (
      <div>
        <h1>Hey {props.user.name},</h1>
        <div id="confirmation-page">
          <img id="check-mark" src="/green-check-mark.png"></img>
          <h2> Your order is confirmed!</h2>
        </div>
        <p>
          Thanks for shopping at Grace Potter. Your confirmation number is:
          {props.order.id}. Your order is on the way!
        </p>

        {props.order.products.map(item => (
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
  } else {
    return <Redirect to="/home" />
  }
}

const stateProps = state => ({
  user: state.user,
  order: state.cart.latestOrder
})

const ConnectedOrderConfirmation = connect(stateProps)(OrderConfirmation)

export default ConnectedOrderConfirmation
