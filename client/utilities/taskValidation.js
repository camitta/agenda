import moment from 'moment'

// Change color of task title if today is on, approaching, or past the due date.
export const checkDueDate = (dueDate, id) => {
  const taskName = document.getElementById('taskName' + id)
  if (
    moment(dueDate).isSame(new Date(), 'day') ||
    moment(dueDate).isBefore(new Date(), 'day')
  ) {
    taskName.style.backgroundColor = '#EE7674'
  } else {
    taskName.style.color = 'black'
  }
}

export const generateListTypeName = status => {
  if (status === 'todo') return 'To Do'
  else if (status === 'inprogress') return 'In Progress'
  else {
    return 'Done'
  }
}
