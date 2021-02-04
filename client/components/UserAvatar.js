import React, {useState} from 'react'
import {assignUserToTask} from '../store/tasks'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'

const UserAvatar = props => {
  const users = props.task || []

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
