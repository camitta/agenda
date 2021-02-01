import React from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import {deleteSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

const TaskContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`
const Task = props => {
  const handleDelete = async id => {
    await props.removeSingleTask(id)
    await props.getAllTasks(props.boardId)
  }

  const task = props.task

  return (
    <TaskContainer>
      <Card>
        <Button onClick={() => handleDelete(task.id)}>delete</Button>
        <CardContent>
          <Typography>{task.description}</Typography>
        </CardContent>
      </Card>
    </TaskContainer>
  )
}

const mapDispatch = dispatch => {
  return {
    removeSingleTask: id => dispatch(deleteSingleTask(id)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId))
  }
}

export default connect(null, mapDispatch)(Task)
