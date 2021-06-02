import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Loading,
  SingleBoard,
  Navbar,
  Footer
} from './components'
import {me} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
          {isLoggedIn && (
            <Switch>
              <Route path="/boards/:boardId" component={SingleBoard} />
              <Route path="/home" component={UserHome} />
            </Switch>
          )}
          <Route component={Loading} />
        </Switch>
        {isLoggedIn && <Footer />}
      </>
    )
  }
}

// Being 'logged in' is defined as having a state.user with a truthy id
// Otherwise, state.user will be an empty object, and state.user.id will be falsey
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
