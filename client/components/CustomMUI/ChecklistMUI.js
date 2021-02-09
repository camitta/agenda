import {makeStyles} from '@material-ui/core/styles'

export const ChecklistClasses = makeStyles(() => ({
  checklist: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: '2rem',
    padding: '.5rem',
    width: '25vmax',
    background: '#faf1d4',
    boxShadow: '2px 2px 4px 2px #9c9c9c'
  },
  formItem: {
    paddingLeft: '10px'
  },
  title: {
    padding: '10px'
  },
  add: {
    display: 'flex',
    marginRight: '10%',
    width: '80%'
  }
}))
