import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {deleteSingleTask, getSingleTask} from '../store/tasks'

const TaskContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`
class Task extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    try {
      const {taskId} = this.props
      taskId && this.props.fetchSingleTask(taskId)
    } catch (error) {
      console.log(error)
    }
  }

  handleDelete(id) {
    this.props.removeSingleTask(id)
  }

  render() {
    const task = this.props.task
    console.log('this.props from task: ', this.props)
    return (
      <TaskContainer>
        <Card>
          <Button onClick={() => this.handleDelete(task.id)}>delete</Button>
          <CardContent>
            <Typography>{task.description}</Typography>
          </CardContent>
        </Card>
      </TaskContainer>
    )
  }
}

const mapState = state => {
  return {
    task: state.singleTask
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleTask: id => dispatch(getSingleTask(id)),
    removeSingleTask: id => dispatch(deleteSingleTask(id))
  }
}

export default connect(mapState, mapDispatch)(Task)
