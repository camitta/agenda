import {makeStyles} from '@material-ui/core/styles'

export const taskStyles = makeStyles(theme => ({
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
  cardLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  description: {
    alignSelf: 'flex-start',
    paddingBottom: '30px',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  summary: {
    display: 'flex',
    flexDirection: 'column'
  }
}))
