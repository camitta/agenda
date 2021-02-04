import React, {useState} from 'react'
import {assignUserToTask} from '../store/tasks'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

const UserAvatar = props => {
  const users = props.task || []
  // const users = task.users || []
  console.log('TASK', users)

  return (
    <>
      {users.length ? (
        users.map(user => (
          <Avatar key={user.id}>
            {user.firstName[0]}
            {user.lastName[0]}
          </Avatar>
        ))
      ) : (
        <></>
      )}
      {/* <Avatar style={{
        width: 30,
        height: 30,
      }}>

      </Avatar> */}
      {/* <IconButton
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
          <MenuItem key={user.id} onClick={() => handleClose(user.id)}>{`${user.firstName
            }`}</MenuItem>
        ))}
      </Menu> */}
    </>
  )
}

const mapDispatch = dispatch => {
  return {
    addUserToTask: (taskId, userId) =>
      dispatch(assignUserToTask(taskId, userId))
  }
}

export default connect(null, mapDispatch)(UserAvatar)
