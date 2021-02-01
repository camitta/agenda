import React from 'react'
import {connect} from 'react-redux'
import {fetchMantras} from '../store/mantras'
import {fetchBoards} from '../store/all-boards'

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
      <div>
        {/* get a random mantra */}
        {mantras.length ? (
          <h3>{mantras[Math.floor(Math.random() * mantras.length)].mantra}</h3>
        ) : (
          <div>What's on your agenda?</div>
        )}

        {/* load all team boards */}
        <div>
          {teamBoards.length ? (
            teamBoards.map(item => (
              <div key={item.id}>
                <h3>{item.name}</h3>
              </div>
            ))
          ) : (
            <div />
          )}
        </div>

        {/* load all personal boards */}
        <div>
          {personalBoards.length ? (
            teamBoards.map(item => (
              <div key={item.id}>
                <h3>{item.name}</h3>
              </div>
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
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
