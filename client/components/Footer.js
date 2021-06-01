import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {fetchMantras} from '../store/mantras'
import {StyledBox} from './CustomMUI/FooterMUI'
import ThemeToggle from './ThemeToggle'

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
  const mantras = props.mantras || {}

  return (
    <StyledBox>
      <Grid
        container
        color="primary"
        spacing={0}
        style={{borderTop: '1px solid black', maxWidth: '100%'}}
      >
        <Grid
          container
          align="left"
          style={{maxWidth: '100%'}}
          className="quote"
        >
          <Grid item xs={10}>
            {mantras.mantra ? (
              <Typography
                variant="subtitle1"
                style={{padding: '1em 0 1em 1em', fontFamily: 'inherit'}}
              >
                what's on your agenda?
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
