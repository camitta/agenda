import React, {Component} from 'react'
import {Task} from './Task'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import {connect} from 'react-redux'

//need task.type to figure out what list to add to
const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`
class List extends Component {
  constructor(props) {
    console.log(props)
    super(props)
  }

  // componentDidMount() {
  //   try {
  //     this.props.fetchTasks(this.props.match.params.type)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  render() {
    console.log('LIST THIS.PROPS', this.props)
    //this.props = {tasks: undefined}
    return <ListContainer />
  }
}
const mapState = state => ({
  tasks: state.tasks
})
const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(List)
