import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
export const StyledButton = withStyles(theme => ({
  root: {
    borderRadius: '1px',
    height: '3em',
    position: 'relative',
    lineHeight: 'normal',
    display: 'inline-block',
    fontSize: '1em',
    textAlign: 'center',
    padding: '0.8em 0.8em',
    marginLeft: '0.8em',
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    boxShadow: `0px 3px ${theme.palette.primary.main}`,
    '&:hover': {
      background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
      color: '#FFF'
    }
  }
}))(Button)
