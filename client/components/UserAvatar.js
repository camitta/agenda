import React, {useState} from 'react'
import {connect} from 'react-redux'
import {unassignUserFromTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const UserAvatar = props => {
  const {users, taskId, boardId} = props || []
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState(null)
  const [firstName, setFirstName] = useState('')

  const handleClickOpen = (clickedId, clickedFirstName) => {
    setUserId(clickedId)
    setFirstName(clickedFirstName)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
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
            <Avatar
              key={user.id}
              onClick={() => handleClickOpen(user.id, user.firstName)}
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
          ))
        : null}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {firstName} from this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color: 'red'}}>
            No
          </Button>
          <Button
            onClick={() => handleDelete(userId)}
            style={{color: 'green'}}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapDispatch = dispatch => ({
  unassignUser: (taskId, boardId, userId) =>
    dispatch(unassignUserFromTask(taskId, boardId, userId)),
  fetchTasks: boardId => dispatch(getAllTasks(boardId))
})

export default connect(null, mapDispatch)(UserAvatar)
