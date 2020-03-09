import React from 'react'
import {NavLink as ReactNavLink} from 'react-router-dom'

const NavLink = props => (
  <ReactNavLink
    className="nav-link"
    activeClassName="nav-link-active"
    {...props}
  />
)

export default NavLink
