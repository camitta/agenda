import {makeStyles} from '@material-ui/core/styles'

export const singleBoardStyles = makeStyles(() => ({
  singleBoardContainer: {
    marginBottom: '15%'
  },
  deleteContainer: {
    textAlign: 'right',
    margin: 'auto 5%'
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
    alignContent: 'center'
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
  },
  title: {
    flex: '0 1 auto',
    height: '100px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    paddingTop: '15px'
  }
}))
