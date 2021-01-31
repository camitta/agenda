import React, {Component} from 'react'
import {Task} from './Task'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import {connect} from 'react-redux'

//create List
//need task.type to figure out what list to add to
const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`
const StyledInput = styled.input`
  width: 100%;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`
class List extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   try {
  //     this.props.fetchTasks(this.props.match.params.type)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  render() {
    console.log('PROPS IN LIST', this.props)
    console.log('IN LIST RENDER', this.props.list.type)
    //not sure if below it correct syntax
    return <ListContainer />
  }
}
const mapState = state => ({
  lists: state.lists
})
const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(List)
