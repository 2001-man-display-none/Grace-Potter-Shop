import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteItemThunk, updateQty} from '../store/cart'
import {render} from 'enzyme'

class CartTile extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleIncrease = this.handleIncrease.bind(this)
    this.handleDecrease = this.handleDecrease.bind(this)
  }

  handleIncrease(event) {
    event.preventDefault()
    let itemId = event.target.id
    let cart = this.props.cartItems
    console.log(cart)
    let curQty = cart[0].order_item.quantity
    let newQty = curQty + 1
    console.log('this is curQty', curQty)
    console.log('this is newQty', newQty)
    this.props.updateQtyDispatch(itemId, {quantity: newQty})
  }

  handleDecrease(event) {
    event.preventDefault()
    let itemId = event.target.id
    let cart = this.props.cartItems
    let curQty = cart[0].order_item.quantity
    let newQty = curQty - 1
    console.log('this is curQty', curQty)
    console.log('this is newQty', newQty)
    this.props.updateQtyDispatch(itemId, {quantity: newQty})
  }

  render() {
    let cartItems = this.props.cartItems

    return (
      <div>
        <div id="cart">
          {console.log(cartItems)}
          {cartItems.map(item => (
            <div key={item.id} id="cart-tile">
              <div>
                <Link to={`/items/${item.id}`}>
                  <img src={item.image} width="200" height="200" />
                </Link>
              </div>
              <div>
                <Link to={`/items/${item.id}`}>
                  <h2>{item.name}</h2>
                </Link>
                {/* <p>{item.description}</p> */}
                <p>${item.price}</p>
              </div>
              <div>
                <div>
                  <span>Quantity: {item.order_item.quantity}</span>
                </div>
                <div>
                  <button
                    id={item.id}
                    className="smbuttons"
                    type="button"
                    onClick={this.handleIncrease}
                  >
                    +
                  </button>
                  <button
                    id={item.id}
                    className="smbuttons"
                    type="button"
                    onClick={this.handleDecrease}
                  >
                    -
                  </button>
                </div>
                <div id="cart-price">
                  <p>Total:</p>
                  <p>${item.price * 2}</p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => this.props.deleteItem(item.id)}
                  >
                    Remove item from cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  deleteItem: id => dispatch(deleteItemThunk(id)),
  updateQtyDispatch: (itemId, qty) => dispatch(updateQty(itemId, qty))
})

const ConnectedCartTile = connect(null, mapDispatch)(CartTile)

export default ConnectedCartTile
