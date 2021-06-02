//auth form error handling
export const generateErrorMessage = errMessage => {
  const types = ['firstName', 'lastName', 'email', 'password']
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

export const validateForm = errors => {
  let valid = true
  // checking if any of the errors are true.
  valid = !Object.values(errors).filter(err => err).length
  return valid
}
