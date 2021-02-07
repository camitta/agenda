import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

// Material UI
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

// Custom MUI
import {homeStyles} from './CustomMUI/UserHomeMUI'

// Redux
import {fetchMantras} from '../store/mantras'
import {fetchBoards} from '../store/all-boards'

// Components
import {Checklist, CreateBoard} from './index'
//ADDED HERE
// A simple paper with some text in it
const ContentBlock = ({name}) => (
  <Paper style={{padding: '10px'}}>
    <Typography variant="h6">{name}</Typography>
  </Paper>
)

const Column = ({name}) => (
  <React.Fragment>
    <Grid item xs={12}>
      <ContentBlock name={`${name} 1`} />
    </Grid>
    <Grid item xs={12}>
      <ContentBlock name={`${name} 2`} />
    </Grid>
  </React.Fragment>
)

const styles = {
  'grid-xs-3': {},
  'grid-xs-9': {},

  // we need to generate this styles in https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Grid/Grid.js
  'spacing-xs-16': {
    '&$grid-xs-3': {
      maxWidth: 'calc(25% + 16px)',
      flexBasis: 'calc(25% + 16px)'
    },

    '&$grid-xs-9': {
      maxWidth: 'calc(75% + 16px)',
      flexBasis: 'calc(75% + 16px)'
    }
  }
}

// An outer grid where
const GridWithTwoElementNesting = () => (
  <Grid container spacing={16}>
    <Grid item xs={3}>
      <Grid container spacing={16}>
        <Column name="Left" />
      </Grid>
    </Grid>
    <Grid item xs={9}>
      <Grid container spacing={16}>
        <Column name="Right" />
      </Grid>
    </Grid>
  </Grid>
)
//UP TO HERE

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
    <div style={{marginTop: 20, padding: 30}}>
      <Box className={classes.mantra}>
        {/* get a random mantra */}
        {mantras.length ? (
          <Typography
            style={{fontSize: 20, fontFamily: 'pinyon script, cursive'}}
          >
            {mantras[Math.floor(Math.random() * mantras.length)].mantra}
          </Typography>
        ) : (
          <Typography
            style={{fontSize: 20, fontFamily: 'pinyon script, cursive'}}
          >
            What's on your agenda?
          </Typography>
        )}
      </Box>

      <Button type="button" className={classes.addBoard} onClick={handleOpen}>
        <AddIcon />
        <Typography variant="button">New Board</Typography>
      </Button>

      <CreateBoard getBoards={props.getBoards} open={open} setOpen={setOpen} />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Grid container spacing={3} className={classes.checklist}>
            <Grid item xs={12}>
              <Checklist />
            </Grid>
          </Grid>
        </Grid>
        {/* load all personal boards */}
        <Grid item xs={9}>
          <Grid container spacing={3} className={classes.boards}>
            <Grid item xs={12}>
              <Typography variant="h3" className={classes.title}>
                Personal Boards
              </Typography>
            </Grid>

            <Grid container spacing={3} className={classes.boards}>
              <Grid item xs={12}>
                <Grid container spacing={3} className={classes.container}>
                  <Grid item xs={9}>
                    {personalBoards.length ? (
                      personalBoards
                        .filter(item => item.type === 'personal')
                        .map(item => (
                          <Grid item className={classes.gridItem} key={item.id}>
                            <Button
                              className={classes.boardItem}
                              href={`/boards/${item.id}`}
                            >
                              {item.name}
                            </Button>
                          </Grid>
                        ))
                    ) : (
                      <p>Add a new board!</p>
                    )}
                  </Grid>
                </Grid>
                {/* load all team boards */}
                <Grid container>
                  <Grid item>
                    <Typography className={classes.title} variant="h3">
                      Team Boards
                    </Typography>
                  </Grid>
                  <Grid container className={classes.container}>
                    {teamBoards.length ? (
                      teamBoards
                        .filter(item => item.type === 'team')
                        .map(item => (
                          <Grid item className={classes.gridItem} key={item.id}>
                            <Button
                              className={classes.boardItem}
                              href={`/boards/${item.id}`}
                            >
                              {item.name}
                            </Button>
                          </Grid>
                        ))
                    ) : (
                      <p>Add a new board!</p>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
