import {makeStyles} from '@material-ui/core/styles'

export const ChecklistClasses = makeStyles(() => ({
  checklist: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: '20px',
    padding: '10px',
    width: '20vmax',
    background: '#faf1d4',
    boxShadow: '2px 2px 4px 2px #9c9c9c'
  },
  formItem: {
    padding: '10px'
  },
  title: {
    textAlign: 'center',
    padding: '10px'
  },
  add: {
    display: 'flex',
    marginRight: '10%',
    width: '100%'
  }
}))
