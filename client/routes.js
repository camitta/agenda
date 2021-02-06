import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, SingleBoard, Navbar} from './components'
import {me} from './store'

//Material UI
import CircularProgress from '@material-ui/core/CircularProgress'
/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    this.props.loadInitialData()
    this.setState({
      loaded: true
    })
  }

  render() {
    const {isLoggedIn} = this.props
    const {loaded} = this.state
    if (!loaded) {
      return (
        <div>
          <CircularProgress />
        </div>
      )
    }
    if (!isLoggedIn) {
      return (
        <div>
          <Navbar />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      )
    }
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/boards/:boardId" component={SingleBoard} />
          <Route path="/home" component={UserHome} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
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

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
