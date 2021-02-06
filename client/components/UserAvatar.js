import React from 'react'
import {unassignUserFromTask} from '../store/tasks'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import {getAllTasks} from '../store/all-tasks'

const UserAvatar = props => {
  const {users, taskId, boardId} = props || []

  const handleDelete = async userId => {
    try {
      await props.unassignUser(taskId, boardId, userId)
      await props.fetchTasks(boardId)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {users.length
        ? users.map(user => (
            <Avatar key={user.id} onClick={() => handleDelete(user.id)}>
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
          ))
        : null}
    </>
  )
}

const mapDispatch = dispatch => ({
  unassignUser: (taskId, boardId, userId) =>
    dispatch(unassignUserFromTask(taskId, boardId, userId)),
  fetchTasks: boardId => dispatch(getAllTasks(boardId))
})

export default connect(null, mapDispatch)(UserAvatar)
