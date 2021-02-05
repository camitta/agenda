import {makeStyles, createMuiTheme} from '@material-ui/core/styles'

export const fontTheme = createMuiTheme()

export const homeStyles = makeStyles(() => ({
  mantra: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px'
  },
  container: {
    minHeight: '150px'
  },
  boardItem: {
    minHeight: '150px',
    minWidth: '150px',
    width: '100%',
    background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
    boxShadow: '2px 2px 4px 2px #ff6987',
    borderRadius: 3,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
    fontWeight: 500
  },
  gridItem: {
    margin: '10px',
    width: '20%'
  },
  title: {
    marginTop: '20px'
  },
  addBoard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    float: 'right',
    background: '#e59b69',
    borderRadius: 3,
    padding: '5px 9px 5px 5px',
    margin: '10px 30px 10px 10px',
    boxShadow: '2px 2px 4px 2px #ff6987',
    color: 'white',
    border: 'none'
  },
  boards: {
    marginLeft: '20px'
  }
}))

export const modalStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    height: '25%',
    width: '25%',
    border: '2px solid #000',
    padding: '20px',
    background: 'white',
    outline: 0
  }
}))
