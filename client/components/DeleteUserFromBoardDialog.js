import React from 'react'
import {connect} from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/Button'

const DeleteUserFromBoardDialog = props => {
  const {handleClose, open, handleDelete, userId, userName} = props

  if (userId === props.currentUser.id) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove yourself from this board? You will
            also be removed from all tasks on this board.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose} style={{color: 'red'}}>
            No
          </IconButton>
          <IconButton
            onClick={() => handleDelete(userId)}
            style={{color: 'green'}}
            autoFocus
            href="/home"
          >
            Yes
          </IconButton>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to remove {userName} from this board?
          {' ' + userName} will also be removed from all tasks on this board.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleClose} style={{color: 'red'}}>
          No
        </IconButton>
        <IconButton
          onClick={() => handleDelete(userId)}
          style={{color: 'green'}}
          autoFocus
        >
          Yes
        </IconButton>
      </DialogActions>
    </Dialog>
  )
}

const mapState = state => ({
  currentUser: state.user
})

export default connect(mapState)(DeleteUserFromBoardDialog)
