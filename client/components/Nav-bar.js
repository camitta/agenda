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
import {StyledText} from './CustomMUI/StyledText'

// const StyledButton = withStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     borderRadius: 3,
//     border: 0,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
//   label: {
//     textTransform: 'capitalize',
//   },
// })(Button);

// Navbar
const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = navStyles()
  return (
    <AppBar position="static" color="default" className={classes.root}>
      <Toolbar color="secondaryMain" className={classes.toolbar}>
        <Typography
          className={classes.title}
          variant="h5"
          style={{justifyContent: 'flex-start', fonstStretch: 'expanded'}}
        >
          <Link
            href={isLoggedIn ? '/home' : '/login'}
            style={{fonstStretch: 'expanded'}}
          >
            Agenda
          </Link>
        </Typography>

        {isLoggedIn ? (
          <div className={classes.buttonContainer}>
            <StyledButton href="/home">Home</StyledButton>
            <StyledButton href="#" onClick={handleClick}>
              Log Out
            </StyledButton>
          </div>
        ) : (
          <div className={classes.buttonContainer}>
            <StyledButton href="/login">Log In</StyledButton>
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
