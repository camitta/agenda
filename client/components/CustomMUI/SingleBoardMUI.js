import {makeStyles} from '@material-ui/core/styles'

export const singleBoardStyles = makeStyles(() => ({
  deleteButton: {
    backgroundColor: '#e6766e',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#eb4034',
      color: '#FFF'
    }
  },
  deleteContainer: {
    textAlign: 'center'
  },
  modal: {
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
