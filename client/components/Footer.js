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
      <Container>
        <Grid container spacing={0}>
          <Grid item={true} xs={12} />
          <div>
            <Grid container>
              <Grid item={true} xs={12}>
                <StyledList>
                  <ListItem>
                    {/* get a random mantra */}
                    {mantras.length ? (
                      <Typography
                        style={{
                          fontSize: 24,
                          fontFamily: 'pinyon script, cursive'
                        }}
                      >
                        {
                          mantras[Math.floor(Math.random() * mantras.length)]
                            .mantra
                        }
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          fontSize: 24,
                          fontFamily: 'pinyon script, cursive'
                        }}
                      >
                        What's on your agenda?
                      </Typography>
                    )}
                  </ListItem>
                </StyledList>
              </Grid>
            </Grid>
          </div>
          <div style={{justifyContent: 'flex-end'}}>
            <Grid container style={{justifyContent: 'flex-end'}}>
              <Grid item={true} xs={12}>
                <ThemeToggle />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
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
