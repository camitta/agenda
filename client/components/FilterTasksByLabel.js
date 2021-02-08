import React, {useState} from 'react'
import {connect} from 'react-redux'
import {filterTasks} from '../store/all-tasks'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

const FilterTasksByLabel = props => {
  return (
    <div>
      <InputLabel>Filter By</InputLabel>
      <Select
        onClick={evt => props.filterByLabel(evt.target.value)}
        name="label"
      >
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="orange">Orange</MenuItem>
        <MenuItem value="yellow">Yellow</MenuItem>
        <MenuItem value="green">Green</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
        <MenuItem value="purple">Purple</MenuItem>
      </Select>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    filterByLabel: label => dispatch(filterTasks(label))
  }
}

export default connect(null, mapDispatch)(FilterTasksByLabel)
