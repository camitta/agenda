import {makeStyles} from '@material-ui/core/styles'

export const ChecklistClasses = makeStyles(theme => ({
  checklist: {
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '.5rem',
    boxShadow: '2px 2px 4px 2px #9c9c9c'
  },
  checklistItem: {
    justifyContent: 'space-between'
  },
  formItem: {
    paddingLeft: '10px'
  },
  title: {
    padding: '10px',
    color: theme.palette.text.secondary
  },
  add: {
    display: 'flex',
    marginRight: '10%',
    width: '80%'
  }
}))
