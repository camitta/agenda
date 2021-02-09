import {withStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

export const StyledBox = withStyles(() => ({
  root: {
    position: 'fixed',
    backgroundColor: '#ffff',
    left: '0',
    bottom: '0',
    width: '100%',
    fontFamily: 'FreightTextProBook, sans-serif',
    fontWeight: 'normal',
    color: '#000000',
    letterSpacing: '1.5px',
    fontSize: 18
  }
}))(Box)
