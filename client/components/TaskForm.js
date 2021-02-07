import React from 'react'
import 'date-fns'

// Material UI
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import {KeyboardDatePicker} from '@material-ui/pickers'

// Custom MUI
import {taskStyles} from './CustomMUI/TaskMUI'

export const TaskForm = props => {
  const classes = taskStyles()

  return (
    <form className={classes.taskCard}>
      <TextField
        style={{width: '100%'}}
        id="filled-basic"
        label="Name"
        name="name"
        variant="filled"
        value={props.state.name}
        onChange={props.handleChange}
      />
      <TextField
        multiline
        style={{width: '100%'}}
        id="filled-textarea"
        label="Description"
        name="description"
        variant="filled"
        value={props.state.description}
        onChange={props.handleChange}
      />
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        name="dueDate"
        disablePast={true}
        onChange={props.handleDateChange}
        label="Due Date"
        value={props.state.dueDate}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
      <div className={classes.inputs}>
        <div>
          <InputLabel>Label</InputLabel>
          <Select
            value={props.state.label}
            onChange={props.handleChange}
            name="label"
          >
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="orange">Orange</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="purple">Purple</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel>Status</InputLabel>
          <Select
            value={props.state.type}
            onChange={props.handleChange}
            name="type"
          >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </div>
      </div>
    </form>
  )
}
