import React from 'react'
import {connect} from 'react-redux'

class UserHome extends React.Component {
  render() {
    return (
      <div>
        <div />
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)
