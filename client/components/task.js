import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import {connect} from 'react-redux'
//below does not exist yet
//also, do we fetch tasks here?
import {deleteTask, fetchSingleTask} from '../store/task'

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
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
    this.props.deleteTask(id)
  }

  render() {
    const task = this.props.task
    return (
      <CardContainer>
        <Card>
          <DeleteButton
            fontSize="small"
            onClick={() => this.handleDelete(task.id)}
          >
            delete
          </DeleteButton>
          <CardContent>
            <Typography>{task.description}</Typography>
          </CardContent>
        </Card>
      </CardContainer>
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
    fetchSingleTask: id => dispatch(fetchSingleTask(id)),
    deleteTask: id => dispatch(deleteTask(id))
  }
}

export default connect(mapState, mapDispatch)(Task)
