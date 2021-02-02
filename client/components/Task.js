import React, {useState} from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import CardContent from '@material-ui/core/CardContent'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import styled from 'styled-components'
import {deleteSingleTask, editSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'
import AddUserToTask from './AddUserToTask'

const TaskContainer = styled.div`
  position: center;
  max-width: 100%;
  word-wrap: break-word;
`
const Task = props => {
  const task = props.task

  const [edit, setEdit] = useState(false)
  const [description, setDescription] = useState(task.description)
  const [name, setName] = useState(task.name)
  const [type, setType] = useState(task.type)

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const handleTypeChange = event => {
    setType(event.target.value)
  }
  const handleDelete = async id => {
    await props.removeSingleTask(id)
    await props.getAllTasks(props.boardId)
  }

  const handleSubmit = async event => {
    await props.updateSingleTask(task.id, {name, description, type})
    await props.getAllTasks(props.boardId)
    setEdit(!edit)
  }

  return (
    <TaskContainer>
      <Card>
        <CardContent>
          {edit === false ? (
            <div>
              <Typography variant="h6">{task.name}</Typography>
              <Typography variant="body2">{task.description}</Typography>
            </div>
          ) : (
            <form>
              <TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                multiline
                id="filled-textarea"
                label="Description"
                variant="filled"
                value={description}
                onChange={handleDescriptionChange}
              />
              <InputLabel>Status</InputLabel>
              <Select value={type} onChange={handleTypeChange}>
                <MenuItem value="todo">Todo</MenuItem>
                <MenuItem value="inprogress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </form>
          )}
        </CardContent>
      </Card>
      <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
        <DeleteIcon />
      </IconButton>
      {edit === false ? (
        <IconButton aria-label="edit" onClick={() => setEdit(!edit)}>
          <EditIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="submit"
          onClick={() => handleSubmit(task.id, description)}
        >
          <DoneIcon />
        </IconButton>
      )}
      <AddUserToTask task={task.id} board={props.task.board} />
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
