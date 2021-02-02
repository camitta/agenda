import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchChecklist} from '../store/checklist'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const ChecklistClasses = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    height: '100%',
    width: '25%',
    background: '#faf1d4'
  },
  formItem: {
    padding: '10px'
  }
}))

const Checklist = props => {
  useEffect(() => {
    loadChecklist()
  }, [])

  const classes = ChecklistClasses()

  async function loadChecklist() {
    await props.getChecklist()
  }

  const tasks = props.checklist || []

  return (
    <Box className={classes.container}>
      {tasks.length ? (
        tasks.map(item => {
          return (
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={item.description}
              className={classes.formItem}
              key={item.id}
            />
          )
        })
      ) : (
        <p />
      )}
    </Box>
  )
}

const mapState = state => ({
  checklist: state.checklist
})

const mapDispatch = dispatch => ({
  getChecklist: () => dispatch(fetchChecklist())
})

export default connect(mapState, mapDispatch)(Checklist)
