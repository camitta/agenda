import React, {Component} from 'react'
import {Task} from './Task'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {getAllTasks} from '../store/all-tasks'

//need task.type to figure out what list to add to
const TaskContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`
class List extends Component {
  constructor(props) {
    console.log('CONSTRUCTOR PROPS', props)
    super(props)
  }
  componentDidMount() {
    try {
      console.log('LIST COMPONENT MOUNT PROPS', this.props)
      this.props.fetchTasks(this.props.status)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log('STATUS HERE', this.props.status)
    const {status} = this.props
    return <TaskContainer />
  }
}
const mapState = state => ({
  tasks: state.tasks
})
const mapDispatch = dispatch => {
  return {
    fetchTasks: status => dispatch(getAllTasks(status))
  }
}

export default connect(mapState, mapDispatch)(List)
