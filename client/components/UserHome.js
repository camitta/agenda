import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

// Material UI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

// Custom MUI
import {homeStyles} from './CustomMUI/UserHomeMUI'
import {StyledButton} from './CustomMUI/GradientButton'

// Redux
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
    } catch (err) {
      console.log(err)
    }
  }

  const [open, setOpen] = useState(false)

  // Toggles 'create board' dialog box.
  function handleOpen() {
    setOpen(true)
  }

  // Filter out boards based on type (personal or team).
  const teamBoards = props.boards.filter(item => item.type === 'team') || []
  const personalBoards =
    props.boards.filter(item => item.type === 'personal') || []

  return (
    <Container
      style={{display: 'flex', paddingTop: '128px'}}
      xs={12}
      spacing={3}
    >
      <Grid
        container
        className={classes.container}
        spacing={3}
        style={{margin: '1em 1em 0 0'}}
      >
        <StyledButton
          item="true"
          style={{display: 'flex'}}
          onClick={handleOpen}
        >
          <AddIcon fontSize="small" style={{marginRight: '5px'}} />
          <span>New Board</span>

          <CreateBoard
            getBoards={props.getBoards}
            open={open}
            setOpen={setOpen}
          />
        </StyledButton>
        <Grid
          item
          xs={12}
          container
          style={{
            padding: '10px',
            marginLeft: '2rem',
            marginRight: '2rem',
            marginTop: '5em'
          }}
        >
          <Grid
            item
            xs
            container
            direction="row"
            spacing={3}
            style={{justifyContent: 'space-between'}}
          >
            <Grid item xs={4}>
              <Checklist />
            </Grid>
            <Grid item xs={8}>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs={12} style={{marginLeft: '6rem'}}>
                  <Typography
                    className={classes.boardTitles}
                    variant="h3"
                    style={{marginBottom: '1em'}}
                  >
                    Personal Boards
                  </Typography>
                  <Grid
                    item
                    xs
                    container
                    direction="row"
                    style={{marginBottom: '2rem'}}
                  >
                    {personalBoards.length ? (
                      personalBoards
                        .filter(item => item.type === 'personal')
                        .map(item => (
                          <Button
                            key={item.id}
                            variant="outlined"
                            className={classes.boardItem}
                            href={`/boards/${item.id}`}
                            style={{textTransform: 'none'}}
                          >
                            {item.name}
                          </Button>
                        ))
                    ) : (
                      <Typography variant="body1" style={{marginBottom: '2em'}}>
                        Add a new board!
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '6rem'}}>
                  <Typography
                    variant="h3"
                    style={{marginBottom: '1em'}}
                    className={classes.boardTitles}
                  >
                    Team Boards
                  </Typography>
                  <Grid
                    item
                    xs
                    container
                    direction="row"
                    style={{marginBottom: '2rem'}}
                  >
                    {teamBoards.length ? (
                      teamBoards
                        .filter(item => item.type === 'team')
                        .map(item => (
                          <Button
                            key={item.id}
                            variant="outlined"
                            className={classes.boardItem}
                            href={`/boards/${item.id}`}
                            style={{textTransform: 'none'}}
                          >
                            {item.name}
                          </Button>
                        ))
                    ) : (
                      <Typography variant="body1" style={{marginBottom: '2em'}}>
                        Add a new board!
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

const mapState = state => {
  return {
    boards: state.allBoards
  }
}

const mapDispatch = dispatch => {
  return {
    getBoards: () => dispatch(fetchBoards())
  }
}

export default connect(mapState, mapDispatch)(UserHome)
