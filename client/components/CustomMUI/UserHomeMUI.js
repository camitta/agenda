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
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    padding: '1em'
  },
  container: {
    minHeight: '150px',
    spacing: 2
  },
  boardItem: {
    padding: '5px 9px 5px 5px',
    minHeight: '100px',
    minWidth: '100px',
    background: '#fff',
    '&:hover': {
      background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
      color: '#FFF'
    },
    boxShadow: '0px 3px #000000',
    color: 'black',
    borderRadius: 1,
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
    padding: '5px 5px 5px 5px',
    margin: '10px 10px 10px 10px',
    color: 'black'
  },
  boards: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '5px'
  },
  textHover: {
    color: '#000000',
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
