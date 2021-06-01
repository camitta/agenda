import {makeStyles} from '@material-ui/core/styles'

export const navStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.main,
    justifyContent: 'space-between',
    position: 'fixed',
    top: '0',
    display: 'flex'
  },
  toolbar: {
    minHeight: 128,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: theme.palette.secondary.main,
    fontFamily: "'Source Serif Pro', serif",
    display: 'flex',
    transform: 'scaleX(1.2)',
    transformOrigin: '0 0',
    fontWeight: '300',
    fontSize: '3em',
    position: 'relative',
    padding: '0 0 0.4em .6em',
    margin: '0 0 0.2em 0.2em'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'fixed',
    top: '1.2em',
    right: '1.2em'
  }
}))
