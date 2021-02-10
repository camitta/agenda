import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import {Container} from '@material-ui/core'
import {fetchMantras} from '../store/mantras'
import {StyledBox, StyledList} from './CustomMUI/FooterMUI'
import {ThemeToggle} from './ThemeToggle'

const Footer = props => {
  useEffect(() => {
    loadPage()
  }, [])
  async function loadPage() {
    try {
      await props.getMantras()
    } catch (err) {
      console.log(err)
    }
  }
  const mantras = props.mantras || []

  return (
    <StyledBox>
      <Grid container spacing={0} style={{borderTop: '1px solid black'}}>
        <Grid container align="left">
          <Grid item xs={10}>
            {/* get a random mantra */}
            {mantras.length ? (
              <Typography
                style={{
                  fontSize: 24,
                  fontFamily: 'pinyon script, cursive',
                  padding: '.65em'
                }}
              >
                {mantras[Math.floor(Math.random() * mantras.length)].mantra}
              </Typography>
            ) : (
              <Typography
                style={{
                  fontSize: 24,
                  fontFamily: 'pinyon script, cursive',
                  padding: '.4em'
                }}
              >
                What's on your agenda?
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs
            align="right"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <div style={{justifyContent: 'flex-end'}}>
              <Grid container>
                <Grid item={true} xs={12}>
                  <ThemeToggle />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </StyledBox>
  )
}

const mapState = state => {
  return {
    mantras: state.mantras
  }
}

const mapDispatch = dispatch => {
  return {
    getMantras: () => dispatch(fetchMantras())
  }
}

export default connect(mapState, mapDispatch)(Footer)
