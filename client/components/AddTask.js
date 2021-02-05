import React, {useState} from 'react'
import {addSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'
import {connect} from 'react-redux'
import {generateErrorMessage} from '../functions'

// Material UI components
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import 'date-fns'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import IconButton from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'

const PostContainer = styled.div`
  position: center;
  max-width: 100%;
  word-wrap: break-word;
`

const AddTask = props => {
  const {boardId, type, error} = props

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(new Date())
  const [label, setLabel] = useState('red')

  const handleName = event => {
    setName(event.target.value)
  }

  const handleDescription = event => {
    setDescription(event.target.value)
  }

  const handleLabel = event => {
    setLabel(event.target.value)
  }

  const handleDate = date => {
    setDueDate(date)
  }

  const handleSubmit = async () => {
    await props.add(boardId, {name, description, dueDate, label, type})
    await props.getAllTasks(boardId)
    setName('')
    setDescription('')
    setDueDate(new Date())
  }
  return (
    <PostContainer>
      <form>
        <TextField
          required
          id="filled-required"
          label="Name"
          variant="filled"
          value={name}
          onChange={handleName}
        />
        <TextField
          required
          multiline
          id="filled-required"
          label="Description"
          variant="filled"
          value={description}
          onChange={handleDescription}
        />
        <TextField
          id="filled-read-only-input"
          label="Status"
          value={type}
          InputProps={{
            readOnly: true
          }}
          variant="filled"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Due Date"
            value={dueDate}
            onChange={handleDate}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>

        <InputLabel>Label</InputLabel>
        <Select value={label} onChange={handleLabel}>
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="orange">Orange</MenuItem>
          <MenuItem value="yellow">Yellow</MenuItem>
          <MenuItem value="green">Green</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="purple">Purple</MenuItem>
        </Select>
      </form>
      {error &&
        error.response && (
          <div>{generateErrorMessage(error.response.data)}</div>
        )}
      <IconButton aria-label="submit" onClick={handleSubmit}>
        <DoneIcon />
      </IconButton>
    </PostContainer>
  )
}

const mapState = state => ({
  error: state.singleTask.error
})

const mapDispatch = dispatch => {
  return {
    add: (boardId, task) => dispatch(addSingleTask(boardId, task)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId))
  }
}

export default connect(mapState, mapDispatch)(AddTask)
