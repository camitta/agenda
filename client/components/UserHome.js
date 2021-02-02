import React from 'react'
import {connect} from 'react-redux'
import {fetchMantras} from '../store/mantras'
import {fetchBoards} from '../store/all-boards'
import {StyledButton} from './navbar'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

class UserHome extends React.Component {
  async componentDidMount() {
    try {
      await this.props.getBoards()
      await this.props.getMantras()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    // filter out different board types
    const teamBoards =
      this.props.boards.filter(item => item.type === 'team') || []
    const personalBoards =
      this.props.boards.filter(item => item.type === 'personal') || []
    const mantras = this.props.mantras || []
    return (
      <Grid>
        {/* get a random mantra */}
        {mantras.length ? (
          <h3>{mantras[Math.floor(Math.random() * mantras.length)].mantra}</h3>
        ) : (
          <div>What's on your agenda?</div>
        )}

        {/* load all team boards */}
        <div>
          {teamBoards.length ? (
            teamBoards.filter(item => item.type === 'team').map(item => (
              <div key={item.id}>
                <StyledButton href={`/boards/${item.id}`}>
                  {item.name}
                </StyledButton>
              </div>
            ))
          ) : (
            <div />
          )}
        </div>

        {/* load all personal boards */}
        <div>
          {personalBoards.length ? (
            teamBoards.filter(item => item.type === 'personal').map(item => (
              <div key={item.id}>
                <h3>{item.name}</h3>
              </div>
            ))
          ) : (
            <div />
          )}
        </div>
      </Grid>
    )
  }
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
