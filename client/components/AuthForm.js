import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login, signup} from '../store'
import Button from '@material-ui/core/Button'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  const inputColumn = arrOfColumns => {
    return arrOfColumns.map(columnName => {
      let nameType = columnName.replace(/\s+/g, '')
      nameType = nameType[0].toLowerCase() + nameType.slice(1)
      const type = nameType === 'password' ? 'password' : 'text'

      return (
        <div key={nameType}>
          <label htmlFor={nameType}>
            <small>{columnName}</small>
          </label>
          <input name={nameType} type={type} />
        </div>
      )
    })
  }

  if (name === 'login') {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          {inputColumn(['Email', 'Password'])}
          <div>
            <Button type="submit">{displayName}</Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {inputColumn(['First Name', 'Last Name', 'Email', 'Password'])}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (evt.target.name === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        dispatch(signup(email, password, firstName, lastName))
      } else {
        dispatch(login(email, password))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
