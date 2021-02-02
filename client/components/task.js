import React from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import {deleteSingleTask, editSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

const TaskContainer = styled.div`
  position: center;
  max-width: 100%;
  word-wrap: break-word;
`
const Task = props => {
  const handleDelete = async id => {
    await props.removeSingleTask(id)
    await props.getAllTasks(props.boardId)
  }
  const handleEdit = async (id, task) => {
    await props.updateSingleTask(id, task)
    await props.getAllTasks(props.boardId)
  }

  const task = props.task

  return (
    <TaskContainer>
      <Card>
        <CardContent>
          <Typography>{task.description}</Typography>
        </CardContent>
      </Card>
      <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="edit" onClick={() => handleEdit(task.id, task)}>
        <EditIcon />
      </IconButton>
    </TaskContainer>
  )
}

const mapDispatch = dispatch => {
  return {
    removeSingleTask: id => dispatch(deleteSingleTask(id)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId)),
    updateSingleTask: (id, task) => dispatch(editSingleTask(id, task))
  }
}

export default connect(null, mapDispatch)(Task)
