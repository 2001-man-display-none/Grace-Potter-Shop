import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const UserHome = props => {
  return (
    <div>
      <h3>Welcome, {props.name}!</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)
