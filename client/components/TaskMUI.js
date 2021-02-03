import {makeStyles} from '@material-ui/core/styles'

export const taskStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'stretch'
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}))
