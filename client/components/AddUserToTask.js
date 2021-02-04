import React, {useState} from 'react'
import {assignUserToTask} from '../store/tasks'
import {connect} from 'react-redux'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import IconButton from '@material-ui/core/Button'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const AddUserToTask = props => {
  const taskId = props.task
  const board = props.board
  const boardUsers = board.users
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = async userId => {
    await props.addUserToTask(taskId, userId)
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-label="addUser"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PersonAddIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {boardUsers.map(user => (
          <MenuItem key={user.id} onClick={() => handleClose(user.id)}>{`${
            user.firstName
          }`}</MenuItem>
        ))}
      </Menu>
    </>
  )
}

const mapDispatch = dispatch => {
  return {
    addUserToTask: (taskId, userId) =>
      dispatch(assignUserToTask(taskId, userId))
  }
}

export default connect(null, mapDispatch)(AddUserToTask)
