import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

// Material UI
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

// Custom MUI
import {StyledButton} from './Navbar'
import {ThemeProvider} from '@material-ui/core/styles'
import {homeStyles, fontTheme} from './CustomMUI/UserHomeMUI'
fontTheme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem'
  },
  [fontTheme.breakpoints.up('md')]: {
    fontSize: '2.4rem'
  }
}

// Redux
import {fetchMantras} from '../store/mantras'
import {fetchBoards} from '../store/all-boards'

// Components
import {Checklist, CreateBoard} from './index'

const UserHome = props => {
  useEffect(() => {
    loadPage()
  }, [])

  const classes = homeStyles()

  async function loadPage() {
    try {
      await props.getBoards()
      await props.getMantras()
    } catch (err) {
      console.log(err)
    }
  }

  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true)
  }

  // filter out different board types
  const teamBoards = props.boards.filter(item => item.type === 'team') || []
  const personalBoards =
    props.boards.filter(item => item.type === 'personal') || []
  const mantras = props.mantras || []
  return (
    <ThemeProvider theme={fontTheme}>
      <Grid container className={classes.mantra}>
        {/* get a random mantra */}
        {mantras.length ? (
          <Typography variant="h6">
            {mantras[Math.floor(Math.random() * mantras.length)].mantra}
          </Typography>
        ) : (
          <div>What's on your agenda?</div>
        )}
      </Grid>

      <Button type="button" className={classes.addBoard} onClick={handleOpen}>
        <AddIcon />
        <Typography variant="button">New Board</Typography>
      </Button>

      <CreateBoard getBoards={props.getBoards} open={open} setOpen={setOpen} />

      <Box display="flex">
        <Checklist />

        <Container className={classes.boards}>
          {/* load all personal boards */}
          <Typography variant="h4" className={classes.title}>
            Personal Boards
          </Typography>
          <Grid container className={classes.container}>
            {personalBoards.length ? (
              personalBoards
                .filter(item => item.type === 'personal')
                .map(item => (
                  <Grid item className={classes.gridItem} key={item.id}>
                    <StyledButton
                      className={classes.boardItem}
                      href={`/boards/${item.id}`}
                    >
                      {item.name}
                    </StyledButton>
                  </Grid>
                ))
            ) : (
              <div />
            )}
          </Grid>

          {/* load all team boards */}
          <Typography className={classes.title} variant="h4">
            Team Boards
          </Typography>
          <Grid container className={classes.container}>
            {teamBoards.length ? (
              teamBoards.filter(item => item.type === 'team').map(item => (
                <Grid item className={classes.gridItem} key={item.id}>
                  <StyledButton
                    className={classes.boardItem}
                    href={`/boards/${item.id}`}
                  >
                    {item.name}
                  </StyledButton>
                </Grid>
              ))
            ) : (
              <div />
            )}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

const mapState = state => {
  return {
    mantras: state.mantras,
    boards: state.allBoards
  }
}

const mapDispatch = dispatch => {
  return {
    getMantras: () => dispatch(fetchMantras()),
    getBoards: () => dispatch(fetchBoards())
  }
}

export default connect(mapState, mapDispatch)(UserHome)
