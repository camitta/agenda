import React, {useState} from 'react'
import {DeleteUser} from './index'
import {connect} from 'react-redux'
import {unassignUserFromTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

const UserAvatar = props => {
  const {users, taskId, boardId} = props || []
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async userId => {
    try {
      await props.unassignUser(taskId, boardId, userId)
      await props.fetchTasks(boardId)
      setOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {users.length
        ? users.map(user => (
            <DeleteUser
              key={user.id}
              userId={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              handleDelete={handleDelete}
              open={open}
            />
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
