import {withStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

export const StyledBox = withStyles(theme => ({
  root: {
    position: 'fixed',
    backgroundColor: theme.palette.secondary.main,
    left: '0',
    bottom: '0',
    width: '100%',
    fontFamily: "'Source Serif Pro', serif",
    fontWeight: 'normal',
    color: theme.palette.primary.main,
    letterSpacing: '1.5px',
    fontSize: 18
  }
}))(Box)

// title: {
//   flexGrow: 1,
//   color: theme.palette.secondary.main,
//   fontFamily: "'Source Serif Pro', serif",
//   display: 'flex',
//   transform: 'scaleX(1.2)',
//   transformOrigin: '0 0',
//   fontWeight: '300',
//   fontSize: '3em',
//   position: 'relative',
//   padding: '0 0 0.4em .6em',
//   margin: '0 0 0.2em 0.2em'
// }
