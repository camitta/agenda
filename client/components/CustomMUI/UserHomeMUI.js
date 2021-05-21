import {makeStyles} from '@material-ui/core/styles'

export const homeStyles = makeStyles(theme => ({
  '@global': {
    html: {
      fontSize: 12,
      [theme.breakpoints.up('sm')]: {
        fontSize: 14
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 16
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 20
      }
    }
  },
  root: {
    padding: theme,
    display: 'inline-flex',
    flexDirection: 'column',
    paddingBottom: '50px'
  },
  container: {
    justifyContent: 'flex-end'
  },
  boardItem: {
    padding: '5px 9px 5px 5px',
    minHeight: '110px',
    minWidth: '110px',
    width: '20%',
    textAlign: 'center',
    display: 'inline-flex',
    color: theme.palette.text.secondary,
    background: theme.palette.primary.light,
    '&:hover': {
      background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
      color: '#FFF'
    },
    boxShadow: `0px 3px ${theme.palette.primary.main}`,
    borderRadius: 1,
    fontWeight: 500
  },
  gridItem: {
    margin: '10px',
    direction: 'row'
  },
  boardTitles: {
    color: theme.palette.text.secondary
  },
  title: {
    marginTop: '15px',
    padding: '5px'
  },
  addBoard: {
    display: 'flex',
    justifyContent: 'center',
    float: 'right',
    padding: '5px 5px 5px 5px',
    margin: '10px 10px 10px 10px',
    color: theme.palette.primary.main
  },
  boards: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '5px'
  },
  textHover: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: '#FFF'
    }
  }
}))

export const modalStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    height: '40%',
    width: '100%',
    padding: '20px',
    background: 'white',
    outline: 0
  }
}))
