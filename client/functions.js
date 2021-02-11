import moment from 'moment'

export const generateErrorMessage = errMessage => {
  const types = [
    'firstName',
    'lastName',
    'email',
    'password',
    'name',
    'description'
  ]
  for (let nameType of types) {
    if (errMessage.includes('password')) {
      return `Your password needs to have 6-20 characters!`
    } else if (errMessage.includes(nameType)) {
      nameType = nameType.replace(/(\w+)([A-Z]\w+)/g, '$1 $2')
      nameType = nameType[0].toLowerCase() + nameType.slice(1)
      if (errMessage.includes('notEmpty')) {
        return `Did you fill out the ${nameType}?`
      } else {
        return `Did you fill out ${nameType} correctly?`
      }
    }
  }
}

// Change color of task title if today is on, approaching, or past the due date.
export const checkDueDate = (dueDate, id) => {
  const taskName = document.getElementById('taskName' + id)
  const relativeDate = moment(dueDate)
    .startOf('day')
    .fromNow()
  const dateRegEx = /(hour|minute|second)s/i
  if (
    moment(dueDate).isSame(new Date(), 'day') ||
    moment(dueDate).isBefore(new Date(), 'day')
  ) {
    taskName.style.color = 'red'
  } else if (dateRegEx.test(relativeDate)) {
    taskName.style.color = 'orange'
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
