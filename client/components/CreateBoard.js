import React from 'react'
import {connect} from 'react-redux'

// Material UI
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

// Custom MUI
import {modalStyles} from './CustomMUI/UserHomeMUI'

// Redux
import {addSingleBoard} from '../store/single-board'

export const CreateBoard = props => {
  const classes = modalStyles()

  function handleClose() {
    props.setOpen(false)
  }

  const [state, setState] = React.useState({
    name: '',
    type: 'personal'
  })

  function handleChange(event) {
    setState({...state, [event.target.name]: event.target.value})
  }

  async function handleSubmit() {
    await props.addBoard(state)
    await props.getBoards()
    handleClose()
  }

  return (
    <Dialog
      aria-labelledby="add-board"
      aria-describedby="add-new-board"
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>Create New Board</DialogTitle>
      <DialogContent>
        <form className={classes.paper}>
          <TextField
            autoFocus
            id="filled-basic"
            label="Name"
            name="name"
            variant="filled"
            value={state.name}
            onChange={handleChange}
          />
          <InputLabel>Type</InputLabel>
          <Select value={state.type} name="type" onChange={handleChange}>
            <MenuItem value="personal">Personal</MenuItem>
            <MenuItem value="team">Team</MenuItem>
          </Select>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapDispatch = dispatch => ({
  addBoard: data => dispatch(addSingleBoard(data))
})

export default connect(null, mapDispatch)(CreateBoard)
