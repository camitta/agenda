import normal from './normalTheme'
import dark from './darkTheme'
import wildcard from './wildcardTheme'
import baseTheme from './baseTheme'

const themes = {
  normal,
  dark,
  wildcard,
  baseTheme
}

export default function getTheme(theme) {
  return themes[theme]
}
