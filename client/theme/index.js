import normal from './normalTheme'
import dark from './darkTheme'
import wildcard from './wildcardTheme'

const themes = {
  normal,
  dark,
  wildcard
}

export default function getTheme(theme) {
  return themes[theme]
}
