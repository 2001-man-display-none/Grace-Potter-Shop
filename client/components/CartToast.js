import React from 'react'
import {DefaultToast} from 'react-toast-notifications'

const CartToast = ({children, ...props}) => (
  <div className="cart-toast-wrapper">
    <DefaultToast {...props}>{children}</DefaultToast>
  </div>
)

export default CartToast
