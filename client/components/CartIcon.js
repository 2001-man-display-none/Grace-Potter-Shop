import React from 'react'

const CartIcon = ({itemCount}) => (
  <div className="cart-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 84">
      <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="12" d="M8.4 8H19l10.6 47.5h53l5.2-15.8" />
        <path strokeWidth="16" d="M35.4 73.5h0M74.6 73.5h0" />
      </g>
    </svg>
    <span className="cart-badge">{itemCount}</span>
  </div>
)

export default CartIcon
