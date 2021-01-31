import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
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
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    try {
      this.props.fetchSingleTask(this.props.match.params.taskId)
    } catch (error) {
      console.log(error)
    }
  }

  handleDelete(id) {
    this.props.removeSingleTask(id)
  }

  render() {
    const task = this.props.task
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
