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
    padding: theme
  },
  mantra: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px'
  },
  container: {
    minHeight: '150px',
    spacing: 2
  },
  boardItem: {
    padding: '5px 9px 5px 5px',
    minHeight: '100px',
    minWidth: '100px',
    background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
    boxShadow: '2px 2px 4px 2px #ff6987',
    color: 'white',
    borderRadius: 3,
    alignSelf: 'flex-end',
    fontWeight: 500
  },
  gridItem: {
    margin: '10px'
  },
  title: {
    marginTop: '15px',
    padding: '5px'
  },
  addBoard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    float: 'right',
    background: '#e59b69',
    '&:hover': {
      backgroundColor: '#fcb045',
      color: '#FFF'
    },
    borderRadius: 3,
    padding: '5px 5px 5px 5px',
    margin: '10px 10px 10px 10px',
    boxShadow: '2px 2px 4px 2px #ff6987',
    color: 'white',
    border: 'none'
  },
  boards: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column'
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
    border: '2px solid #000',
    padding: '20px',
    background: 'white',
    outline: 0
  }
}))
