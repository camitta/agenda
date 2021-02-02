import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {makeStyles, withStyles} from '@material-ui/core/styles'

export const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 15px',
    boxShadow: '2px 2px 4px 2px #ff6987'
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button)

const navStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 15px'
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
    fontFamily: 'Roboto Mono',
    fontWeight: 500,
    fontSize: 'xx-large'
  }
}))

const Navbar = function({handleClick, isLoggedIn}) {
  const classes = navStyles()
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h5" noWrap>
          agenda
        </Typography>

        {isLoggedIn ? (
          <div>
            <Button className={classes.menuButton} href="/home">
              HOME
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
            <StyledButton href="/signup">SIGN UP</StyledButton>
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
