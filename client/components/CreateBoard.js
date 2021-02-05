import React from 'react'
import {connect} from 'react-redux'

// Material UI
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Custom MUI
import {modalStyles} from './CustomMUI/UserHomeMUI'

// Redux
import {addSingleBoard} from '../store/single-board'

export const CreateBoard = props => {
  const classes = modalStyles()

  function handleClose() {
    props.setOpen(false)
  }

  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('')

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleTypeChange(event) {
    setType(event.target.value)
  }

  async function handleSubmit() {
    await props.addBoard({name, type})
    await props.getBoards()
  }

  return (
    <Modal
      aria-labelledby="add-board"
      aria-describedby="add-new-board"
      open={props.open}
      onClose={handleClose}
    >
      <form className={classes.paper} onSubmit={handleSubmit}>
        <Typography variant="h6">Add New Board</Typography>
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          value={name}
          onChange={handleNameChange}
        />
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={handleTypeChange}>
          <MenuItem value="personal">Personal</MenuItem>
          <MenuItem value="team">Team</MenuItem>
        </Select>
        <Button type="submit">Add</Button>
      </form>
    </Modal>
  )
}

const mapDispatch = dispatch => ({
  addBoard: data => dispatch(addSingleBoard(data))
})

export default connect(null, mapDispatch)(CreateBoard)
