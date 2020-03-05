import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div>
        <h3>Welcome, {this.props.name}!</h3>
      </div>
    )
  }
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

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(UserHome)
