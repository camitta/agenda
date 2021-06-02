import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login, signup} from '../store'
import Button from '@material-ui/core/Button'
import {generateErrorMessage} from '../utilities/formValidation'

// Material UI
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(() => ({
  paper: {
    paddingTop: '128px',
    marginTop: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%'
  },
  formHeader: {
    marginTop: '1em'
  },
  submit: {
    marginBottom: '2rem',
    marginTop: '2rem',
    width: '100%'
  },
  googleLink: {
    display: 'block'
  }
}))

const AuthForm = props => {
  const classes = useStyles()
  const {name, displayName, handleSubmit, error} = props

  const inputColumn = arrOfColumns => {
    return arrOfColumns.map(columnName => {
      let nameType = columnName.replace(/\s+/g, '')
      nameType = nameType[0].toLowerCase() + nameType.slice(1)
      const type = nameType === 'password' ? 'password' : 'text'

      return (
        <TextField
          key={nameType}
          type={type}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={nameType}
          label={columnName}
          name={nameType}
          autoComplete={nameType}
        />
      )
    })
  }

  if (name === 'login') {
    return (
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.formHeader}>
          Log In
        </Typography>
        <form
          onSubmit={handleSubmit}
          name={name}
          className={classes.form}
          noValidate
        >
          {inputColumn(['Email', 'Password'])}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <div>
          <Link href="/auth/google" className={classes.googleLink}>
            log in with google
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.formHeader}>
        Sign Up
      </Typography>
      <form
        onSubmit={handleSubmit}
        name={name}
        className={classes.form}
        noValidate
      >
        {inputColumn(['First Name', 'Last Name', 'Email', 'Password'])}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {displayName}
        </Button>
        {error &&
          error.response && (
            <div> {generateErrorMessage(error.response.data)} </div>
          )}
      </form>
    </Container>
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
    displayName: 'Log In',
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
