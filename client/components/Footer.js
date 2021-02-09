import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import {Container} from '@material-ui/core'
import {fetchMantras} from '../store/mantras'
import {homeStyles} from './CustomMUI/UserHomeMUI'

const StyledBox = withStyles(() => ({
  root: {
    position: 'fixed',
    backgroundColor: '#ffff',
    left: '0',
    bottom: '0',
    width: '100%',
    fontFamily: 'FreightTextProBook, sans-serif',
    fontWeight: 'normal',
    color: '#000000',
    letterSpacing: '1.5px',
    fontSize: 18
  }
}))(Box)

const StyledList = withStyles(() => ({
  root: {
    fontFamily: 'FreightTextProBook, sans-serif',
    color: '#000000',
    marginTop: 'auto'
  }
}))(List)

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
  // const theme = useTheme();
  const mantras = props.mantras || []
  const classes = homeStyles()
  return (
    <StyledBox color="secondary">
      <Container>
        <Grid container spacing={0}>
          <Grid item={true} xs={12} className="promise" />
          <div className="footer-main-holder">
            <Grid container className="footer-main">
              <Grid item={true} xs={12} className="mantra">
                <StyledList>
                  <ListItem className={classes.mantra}>
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
