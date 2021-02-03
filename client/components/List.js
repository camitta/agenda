import React from 'react'
import Task from './Task'
import PostTask from './PostTask'

// Material UI components
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  align-content: center;
  justify-content: center;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`

const List = props => {
  const {tasks, boardId, status} = props
  return (
    <ListContainer>
      <Typography>{status}</Typography>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          />
          <AccordionDetails>
            <PostTask type={status} boardId={boardId} />
          </AccordionDetails>
        </Accordion>
      </div>

      {tasks && tasks.length
        ? tasks.map(task => (
            <Task key={task.id} task={task} boardId={boardId} />
          ))
        : null}
    </ListContainer>
  )
}

export default List
