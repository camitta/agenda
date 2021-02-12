import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
export const StyledButton = withStyles({
  root: {
    borderRadius: 1,
    height: 40,
    padding: '1em',
    margin: '10px',
    color: 'black',
    boxShadow: '0px 3px #000000',
    '&:hover': {
      background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
      color: '#fff'
    }
  },
  outlined: {
    borderColor: 'black'
  }
})(Button)
