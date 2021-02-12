import {makeStyles} from '@material-ui/core/styles'

export const listStyles = makeStyles(theme => ({
  status: {
    fontWeight: 'bold'
  },
  addTaskForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '7px'
  },
  container: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: '0px',
    alignContent: 'center',
    justifyContent: 'center',
    padding: '8px',
    margin: '0 8px 0 0'
  }
}))
