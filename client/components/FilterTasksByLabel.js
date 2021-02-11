import React, {useState} from 'react'
import {connect} from 'react-redux'
import {filterByLabel} from '../store/filter'
import {getAllTasks} from '../store/all-tasks'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

const FilterTasksByLabel = props => {
  const [label, setLabel] = useState('all')

  const handleFilter = evt => {
    evt.preventDefault()
    props.filterByLabel(evt.target.value)
    props.getAllTasks(props.boardId)
    setLabel(evt.target.value)
  }

  return (
    <div
      style={{
        flex: '0 1 auto',
        marginLeft: 'auto',
        marginRight: '5%',
        paddingTop: '20px'
      }}
    >
      <InputLabel>Filter By</InputLabel>
      <Select onChange={handleFilter} value={label} name="label">
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="#EE7674">Red</MenuItem>
        <MenuItem value="#FDC577">Orange</MenuItem>
        <MenuItem value="#F0E76A">Yellow</MenuItem>
        <MenuItem value="#FF85A1">Pink</MenuItem>
        <MenuItem value="#B681D9">Purple</MenuItem>
      </Select>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    getAllTasks: boardId => dispatch(getAllTasks(boardId)),
    filterByLabel: label => dispatch(filterByLabel(label))
  }
}

export default connect(null, mapDispatch)(FilterTasksByLabel)
