import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import {navStyles} from './CustomMUI/NavBarMUI'
import {StyledButton} from './CustomMUI/GradientButton'

// Navbar
const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = navStyles()
  return (
    <AppBar position="static" color="default" className={classes.root}>
      <Toolbar color="secondaryMain" className={classes.toolbar}>
        <Typography className={classes.title} variant="h5" noWrap>
          <Link href={isLoggedIn ? '/home' : '/login'}>Agenda</Link>
        </Typography>

        {isLoggedIn ? (
          <div>
            <StyledButton variant="outlined" href="/home">
              Home
            </StyledButton>
            <StyledButton
              variant="outlined"
              className={classes.menuButton}
              href="#"
              onClick={handleClick}
            >
              Log Out
            </StyledButton>
          </div>
        ) : (
          <div>
            <StyledButton
              variant="outlined"
              className={classes.menuButton}
              href="/login"
            >
              Log In
            </StyledButton>
            <StyledButton variant="outlined" href="/signup">
              Sign Up
            </StyledButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
