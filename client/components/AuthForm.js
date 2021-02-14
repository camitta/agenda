import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login, signup} from '../store'
import Button from '@material-ui/core/Button'
import {generateErrorMessage} from '../functions'
import google from '../../public/google.png'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
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
        <Container key={nameType} component="main" maxWidth="xs">
          <CssBaseline />
          <div key={nameType} className={classes.paper}>
            <TextField
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
          </div>
        </Container>
      )
    })
  }

  if (name === 'login') {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form
            onSubmit={handleSubmit}
            name={name}
            className={classes.form}
            noValidate
          >
            {inputColumn(['Email', 'Password'])}
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{marginBottom: '2rem', marginTop: '2rem'}}
              >
                {displayName}
              </Button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <div className="googleButton">
            <Button href="/auth/google" style={{padding: '0'}}>
              <img src={google} alt="google" style={{maxHeight: '40px'}} />
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          onSubmit={handleSubmit}
          name={name}
          className={classes.form}
          noValidate
        >
          {inputColumn(['First Name', 'Last Name', 'Email', 'Password'])}
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{marginBottom: '4rem', marginTop: '2rem'}}
            >
              {displayName}
            </Button>
          </div>
          {error &&
            error.response && (
              <div> {generateErrorMessage(error.response.data)} </div>
            )}
        </form>
      </div>
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
