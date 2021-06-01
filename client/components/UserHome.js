import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

// Material UI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

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
    <Grid container className={classes.container}>
      <Grid item className={classes.leftColumn}>
        <Checklist />
      </Grid>
      <Grid item container className={classes.rightColumn}>
        <StyledButton
          item="true"
          style={{position: 'absolute', display: 'flex', right: '3em'}}
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
        <Typography className={classes.boardTitles} variant="h3">
          Personal Boards
        </Typography>
        <Grid item container className={classes.boardsContainer}>
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
                  <div className={classes.content}>{item.name}</div>
                </Button>
              ))
          ) : (
            <Typography variant="body1">Add a new board!</Typography>
          )}
        </Grid>
        <Typography variant="h3" className={classes.boardTitles}>
          Team Boards
        </Typography>
        <Grid item container className={classes.boardsContainer}>
          {teamBoards.length ? (
            teamBoards.filter(item => item.type === 'team').map(item => (
              <Button
                key={item.id}
                variant="outlined"
                className={classes.boardItem}
                href={`/boards/${item.id}`}
                style={{textTransform: 'none'}}
              >
                <div className={`${classes.content} column`}>{item.name}</div>
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
