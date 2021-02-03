import React from 'react'
import 'date-fns'

// Material UI
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

// Custom MUI
import {taskStyles} from './TaskMUI'

export const TaskForm = props => {
  const classes = taskStyles()

  return (
    <form className={classes.taskCard}>
      <TextField
        id="filled-basic"
        label="Name"
        variant="filled"
        value={props.name}
        onChange={props.handleNameChange}
      />
      <TextField
        multiline
        id="filled-textarea"
        label="Description"
        variant="filled"
        value={props.description}
        onChange={props.handleDescriptionChange}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Due Date"
          value={props.dueDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>
      <div className={classes.inputs}>
        <div>
          <InputLabel>Label</InputLabel>
          <Select value={props.label} onChange={props.handleLabelChange}>
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
          <Select value={props.type} onChange={props.handleTypeChange}>
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </div>
      </div>
    </form>
  )
}
