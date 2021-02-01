import React from 'react'
import {connect} from 'react-redux'
import {fetchMantras} from '../store/mantras'

class UserHome extends React.Component {
  componentDidMount() {
    // this.props.getMantras()
  }

  render() {
    console.log('this.props from UserHome: ', this.props)
    return <div>Hello World</div>
    // return <h3>{this.props.mantras[0].mantra}</h3>
  }
}

const mapState = state => {
  return {
    mantras: state.mantras
  }
}

const mapDispatch = dispatch => {
  return {
    getMantras: () => dispatch(fetchMantras())
  }
}

export default connect(mapState, mapDispatch)(UserHome)
