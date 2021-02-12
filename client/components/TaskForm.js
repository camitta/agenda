import React from 'react'
import 'date-fns'

// Material UI
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import {KeyboardDatePicker} from '@material-ui/pickers'
import Typography from '@material-ui/core/Typography'

// Custom MUI
import {taskStyles} from './CustomMUI/TaskMUI'

export const TaskForm = props => {
  const classes = taskStyles()

  return (
    <form className={classes.card}>
      <TextField
        style={{width: '100%'}}
        label="Name"
        name="name"
        variant="filled"
        value={props.state.name}
        onChange={props.handleChange}
      />
      {props.state.errorHandling &&
        props.state.errors.name && (
          <Typography variant="body1" style={{padding: '10px'}}>
            Did you fill out name?
          </Typography>
        )}
      <TextField
        multiline
        style={{width: '100%'}}
        label="Description"
        name="description"
        variant="filled"
        value={props.state.description}
        onChange={props.handleChange}
      />
      {props.state.errorHandling &&
        props.state.errors.description && (
          <Typography variant="body1" style={{padding: '10px'}}>
            Did you fill out description?
          </Typography>
        )}
      <div>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          name="dueDate"
          disablePast={true}
          minDateMessage="Warning: this date has already passed."
          onChange={props.handleDateChange}
          label="Due Date"
          value={props.state.dueDate}
          KeyboardButtonProps={{}}
          autoOk="true"
        />
      </div>
      <div className={classes.inputs}>
        <div>
          <InputLabel>Label</InputLabel>
          <Select
            value={props.state.label}
            onChange={props.handleChange}
            name="label"
          >
            <MenuItem value="#EE7674">Red</MenuItem>
            <MenuItem value="#FDC577">Orange</MenuItem>
            <MenuItem value="#F0E76A">Yellow</MenuItem>
            <MenuItem value="#FF85A1">Pink</MenuItem>
            <MenuItem value="#B681D9">Purple</MenuItem>
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
