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
      return `Your password needs to have 6-12 characters!`
    } else if (errMessage.includes(nameType)) {
      nameType = nameType.replace(/(\w+)([A-Z]\w+)/g, '$1 $2')
      nameType = nameType[0].toUpperCase() + nameType.slice(1)
      if (errMessage.includes('notEmpty')) {
        return `Did you fill out ${nameType}?`
      } else {
        return `Did you fill out ${nameType} correctly?`
      }
    }
  }
}
