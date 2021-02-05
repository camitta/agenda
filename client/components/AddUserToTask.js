import React, {useState} from 'react'
import {assignUserToTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'
import {connect} from 'react-redux'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import IconButton from '@material-ui/core/Button'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {UserAvatar} from './index'

const AddUserToTask = props => {
  const taskId = props.task.id
  const board = props.board
  const boardUsers = board.users
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = async userId => {
    await props.addUserToTask(taskId, board.id, userId)
    await props.fetchTasks(board.id)
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
          <MenuItem key={user.id} onClick={() => handleClose(user.id)}>
            {`${user.firstName} ${user.lastName}`}
          </MenuItem>
        ))}
      </Menu>
      <UserAvatar task={props.task.users} />
    </>
  )
}

const mapDispatch = dispatch => {
  return {
    fetchTasks: boardId => dispatch(getAllTasks(boardId)),
    addUserToTask: (taskId, boardId, userId) =>
      dispatch(assignUserToTask(taskId, boardId, userId))
  }
}

export default connect(null, mapDispatch)(AddUserToTask)
