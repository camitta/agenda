import normal from './normalTheme'
import dark from './darkTheme'
import wildcard from './wildcardTheme'
import base from './baseTheme'
import star from './starTheme'

const themes = {
  normal,
  dark,
  wildcard,
  base,
  star
}

export default function getTheme(theme) {
  return themes[theme]
}
