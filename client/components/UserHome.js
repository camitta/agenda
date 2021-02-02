import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Checklist from './Checklist'
import {fetchMantras} from '../store/mantras'
import {fetchBoards} from '../store/all-boards'
import Grid from '@material-ui/core/Grid'
import {StyledButton} from './Navbar'
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const homeStyles = makeStyles(() => ({
  boardItem: {
    height: '150px',
    width: '100%',
    background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
    boxShadow: '2px 2px 4px 2px #ff6987',
    borderRadius: 3,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
    fontWeight: 500,
    fontSize: 'xx-large'
  },
  gridItem: {
    margin: '10px',
    width: '20%'
  },
  title: {
    marginTop: '20px'
  }
}))

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

  // filter out different board types
  const teamBoards = props.boards.filter(item => item.type === 'team') || []
  const personalBoards =
    props.boards.filter(item => item.type === 'personal') || []
  const mantras = props.mantras || []
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        {/* get a random mantra */}
        {mantras.length ? (
          <Typography variant="h6">
            {mantras[Math.floor(Math.random() * mantras.length)].mantra}
          </Typography>
        ) : (
          <div>What's on your agenda?</div>
        )}
      </Grid>

      <Box display="flex">
        <Checklist />

        {/* load all team boards */}
        <Container>
          <Typography className={classes.title} variant="h4">
            Team Boards
          </Typography>
          <Grid container>
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

          {/* load all personal boards */}
          <Typography variant="h4" className={classes.title}>
            Personal Boards
          </Typography>
          <Grid container>
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
        </Container>
      </Box>
    </div>
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
