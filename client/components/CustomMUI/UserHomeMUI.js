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
      },
      paddingTop: '128px'
    }
  },
  container: {
    display: 'grid',
    padding: '3em 5em 0 5em',
    gridTemplateColumns: '40% 55%',
    columnGap: '5%'
  },
  leftColumn: {},
  rightColumn: {
    display: 'block',
    width: '100%'
  },
  content: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boardItem: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: '3em 3em 3em 3em',
    textAlign: 'center',
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
  boardTitles: {
    color: theme.palette.text.secondary,
    margin: '.8em 0 .8em 0'
  },
  boardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(30%, 1fr))',
    gridGap: '10px',
    gridTemplateRows: 'repeat(auto-fill, minmax(30%, 1fr))'
    // gridAutoRows: '1fr',
    // "&:before": {
    //   content: '',
    //   width: '0',
    //   display: 'block',
    //   paddingTop: '100%'
    // },
    // "&:first-child": {
    //   gridRow: '1 / 1',
    //   gridColumn: '1 / 1'
    // }
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
