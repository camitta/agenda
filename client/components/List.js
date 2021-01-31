import React, {Component} from 'react'
import {Task} from './Task'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import {connect} from 'react-redux'
export default class List extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    try {
      this.props.fetchTasks(this.props.match.params.type)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    //not sure if below it correct syntax
    return this.props.list.type
  }
}
