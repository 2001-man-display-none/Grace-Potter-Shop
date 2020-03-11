import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteItemThunk, updateQty} from '../store/cart'

class CartTile extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleIncrease = this.handleIncrease.bind(this)
    this.handleDecrease = this.handleDecrease.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleIncrease(event) {
    event.preventDefault()
    const {item} = this.props
    let curQty = item.order_item.quantity
    let newQty = curQty + 1
    this.props.updateQtyDispatch(item.id, {quantity: newQty})
  }

  handleDecrease(event) {
    event.preventDefault()
    const {item} = this.props
    let curQty = item.order_item.quantity
    if (curQty > 1) {
      let newQty = curQty - 1
      this.props.updateQtyDispatch(item.id, {quantity: newQty})
    }
  }

  handleChange(event) {
    event.preventDefault()
    const {item} = this.props
    const newQty = Math.floor(event.target.value)
    if (newQty >= 1) {
      this.props.updateQtyDispatch(item.id, {quantity: newQty})
    }
  }

  render() {
    const {item, showControls = false} = this.props
    const {quantity} = item.order_item

    const price = (
      <span className="cart-item-price">
        ${(item.price * quantity).toFixed(2)}
      </span>
    )
    const unitPrice =
      quantity === 1 ? null : (
        <span className="cart-item-unit-price">
          (${(+item.price).toFixed(2)} each)
        </span>
      )

    return (
      <div key={item.id} className="cart-tile">
        <div className="cart-row-left">
          <Link to={`/products/${item.id}`}>
            <img
              className="cart-tile-image"
              src={item.image}
              width="200"
              height="200"
            />
          </Link>
        </div>
        <div className="cart-row-mid">
          <Link className="cart-item-link" to={`/products/${item.id}`}>
            {item.name}
          </Link>
          <p>
            {price}
            {unitPrice}
          </p>
        </div>
        {showControls ? (
          <div className="cart-row-right">
            <div className="cart-item-controls">
              <div className="cart-item-controls-quantity">
                <label>Quantity</label>
                <button
                  id={item.id}
                  className="pure-button"
                  type="button"
                  onClick={this.handleDecrease}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="cart-item-quantity"
                  value={quantity}
                  onChange={this.handleChange}
                />
                <button
                  id={item.id}
                  className="pure-button"
                  type="button"
                  onClick={this.handleIncrease}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="pure-button"
                onClick={() => this.props.deleteItem(item.id)}
              >
                Remove from cart
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-row-right">
            <div className="cart-item-quantity">{quantity}</div>
          </div>
        )}
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
