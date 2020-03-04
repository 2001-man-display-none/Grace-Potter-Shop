import React from 'react'
import {connect} from 'react-redux'
import {signup} from '../store/user'

/**
 * COMPONENT
 */
const Signup = props => {
  const {handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name="signup">
        <div>
          <label htmlFor="name">
            <small>Name</small>
          </label>
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const name = evt.target.name.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(signup(name, email, password))
    }
  }
}

export const ConnectedSignup = connect(mapState, mapDispatch)(Signup)

export default ConnectedSignup
