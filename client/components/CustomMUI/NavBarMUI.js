import {makeStyles, withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
    borderRadius: 3,
    border: 0,
    zIndex: 1,
    color: 'white',
    height: 40,
    padding: '1em',
    margin: '10px',
    boxShadow: '2px 2px 4px 2px #ff6987'
  }
})(Button)

export const navStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 40,
    padding: '1em',
    margin: '10px'
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    fontFamily: 'Inter',
    fontWeight: '300',
    padding: '.5em',
    fontSize: 'xx-large'
  }
}))
