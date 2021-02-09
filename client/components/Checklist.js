import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

// Material UI
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {ChecklistClasses} from './CustomMUI/ChecklistMUI'

// Redux
import {
  fetchChecklist,
  addChecklistItem,
  editChecklist,
  deleteItem
} from '../store/checklist'

const Checklist = props => {
  useEffect(() => {
    loadChecklist()
  }, [])

  const classes = ChecklistClasses()

  const [state, setState] = useState({
    addItem: ''
  })

  async function loadChecklist() {
    await props.getChecklist()
  }

  function handleChange(event) {
    setState({...state, [event.target.name]: event.target.value})
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await props.addItem({description: state.addItem, completed: false})
    setState({...state, addItem: ''})
  }

  async function handleCheck(event) {
    let completed
    if (event.target.value == 'true') {
      completed = false
    } else {
      completed = true
    }
    await props.editItem({
      id: parseInt(event.target.name),
      completed: {completed: completed}
    })
  }

  async function handleDelete(event) {
    await props.deleteItem(event.target.parentNode.id)
  }

  const tasks = props.checklist || []

  return (
    <Grid container style={{paddingBottom: '60px'}}>
      <Grid item xs={12} className={classes.checklist}>
        <Typography variant="h3" className={classes.title}>
          To-Do List
        </Typography>
        <form className={classes.add} onSubmit={handleSubmit}>
          <IconButton type="submit">
            <AddIcon />
          </IconButton>
          <TextField
            name="addItem"
            onChange={handleChange}
            value={state.addItem}
          />
        </form>

        {/* all nodes MUST have the item's ID or delete will not work properly */}
        {tasks.length ? (
          tasks.map(item => {
            return (
              <div key={item.id} id={item.id}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={item.description}
                  className={classes.formItem}
                  checked={Boolean(item.completed)}
                  value={item.completed}
                  name={item.id.toString()}
                  onChange={handleCheck}
                />
                <IconButton onClick={handleDelete} type="button" id={item.id}>
                  <DeleteIcon id={item.id} />
                </IconButton>
              </div>
            )
          })
        ) : (
          <p />
        )}
      </Grid>
      <Grid item xs={12} />
    </Grid>
  )
}

const mapState = state => ({
  checklist: state.checklist
})

const mapDispatch = dispatch => ({
  getChecklist: () => dispatch(fetchChecklist()),
  addItem: item => dispatch(addChecklistItem(item)),
  editItem: item => dispatch(editChecklist(item)),
  deleteItem: itemId => dispatch(deleteItem(itemId))
})

export default connect(mapState, mapDispatch)(Checklist)
