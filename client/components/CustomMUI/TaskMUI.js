import {makeStyles} from '@material-ui/core/styles'

export const taskStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  dueDate: {
    color: '#9954c8'
  },
  cardLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  description: {
    alignSelf: 'flex-start',
    paddingBottom: '30px',
    whiteSpace: 'pre-wrap',
    textAlign: 'left'
  }
}))
