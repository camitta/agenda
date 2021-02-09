import React from 'react'

// Material UI
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

export const DeleteBoard = props => {
  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this board?
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{textAlign: 'center'}}>
        <Button onClick={props.handleDelete} style={{color: 'green'}}>
          Yes
        </Button>
        <Button onClick={props.handleCancel} style={{color: 'red'}}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}
