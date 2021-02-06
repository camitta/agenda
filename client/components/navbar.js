import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import {StyledButton, navStyles} from './CustomMUI/NavBarMUI'

const Navbar = function({handleClick, isLoggedIn}) {
  const classes = navStyles()
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h5" noWrap>
          <Link href={isLoggedIn ? '/home' : '/login'} color="inherit">
            Agenda
          </Link>
        </Typography>

        {isLoggedIn ? (
          <div>
            <Button className={classes.menuButton} href="/home">
              Home
            </Button>
            <Button
              className={classes.menuButton}
              href="#"
              onClick={handleClick}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div>
            <Button className={classes.menuButton} href="/login">
              Log In
            </Button>
            <StyledButton href="/signup">Sign Up</StyledButton>
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
