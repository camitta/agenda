import React, {Component} from 'react'
import List from './List'
import {fetchSingleBoard} from '../store/single-board'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'

const SingleBoardContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class SingleBoard extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    try {
      this.props.fetchSingleBoard(this.props.match.params.id)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    console.log('THIS PROPS', this.props)
    console.log('THIS PROPS BOARD', this.props.board)
    // const { lists } = this.props;
    // return (

    // );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(SingleBoard)
