import {makeStyles} from '@material-ui/core/styles'

export const navStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.main
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: theme.palette.secondary.main,
    alignSelf: 'flex-end',
    fontFamily: 'pinyon script',
    fontWeight: '300',
    padding: '.5em .5em',
    fontSize: '3rem'
  }
}))
