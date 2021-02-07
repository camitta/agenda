import {makeStyles} from '@material-ui/core/styles'

export const taskStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    justifyContent: 'center'
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  dueDate: {
    color: '#3f51b5'
  },
  cardLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))
