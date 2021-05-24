import {createMuiTheme} from '@material-ui/core/styles'
import {fonts, backupFonts} from './fonts'
// base theme (colors excluded)
const theme = createMuiTheme({
  typography: {
    fontSize: 16,
    fontFamily: `${fonts.body}, ${backupFonts.sans}`,
    body1: {
      fontFamily: `${fonts.body}, ${backupFonts.sans}`,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.2rem'
    },
    body2: {
      fontFamily: `${fonts.body2}, ${backupFonts.sans}`,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.2rem'
    },
    h1: {
      fontFamily: `${fonts.header}, ${backupFonts.sans}`,
      fontSize: '2.75rem',
      fontWeight: 400,
      lineHeight: '3.125rem'
    },
    h2: {
      fontFamily: `${fonts.header}, ${backupFonts.sans}`,
      fontSize: '1.625rem',
      fontWeight: 800,
      lineHeight: '1.875rem'
    },
    h3: {
      fontFamily: `${fonts.header}, ${backupFonts.sans}`,
      fontSize: '1.4 rem',
      fontWeight: 800,
      lineHeight: '1.4375rem'
    },
    h4: {
      fontFamily: `${fonts.header}, ${backupFonts.sans}`,
      fontSize: '1.32rem',
      fontWeight: 400,
      lineHeight: '1.4375rem'
    },
    h5: {
      fontFamily: `${fonts.header}, ${backupFonts.sans}`,
      fontSize: '1.25rem',
      fontWeight: 400,
      fonstStretch: 'expanded',
      lineHeight: '1.875rem'
    },
    h6: {
      fontFamily: `${fonts.header}, ${backupFonts.sans}`,
      fontSize: '1.13rem',
      fontWeight: 400,
      lineHeight: '2.75rem'
    },
    subtitle1: {
      fontFamily: `${fonts.header}, ${backupFonts.sans}`,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.4375rem'
    },
    caption: {
      fontFamily: `${fonts.header}, ${backupFonts.sans}`,
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: '0.9375rem'
    },
    button: {
      fontFamily: `${fonts.header}, ${backupFonts.sans}`,
      textTransform: 'lowercase',
      textDecoration: 'none',
      color: '#000000'
    }
  },
  overrides: {
    MuiButton: {
      containedSecondary: {
        backgroundColor: '#fff',
        '&:hover': {
          backgroundColor: '#fff'
        }
      },
      outlined: {
        borderColor: 'black'
      }
    },
    MuiFormLabel: {
      root: {
        fontFamily: 'unset',
        color: '#979797'
      },
      filled: {
        color: '#000000'
      }
    },
    MuiInputBase: {
      root: {
        fontFamily: 'freight-text-pro, serif'
      }
    },
    MuiInputLabel: {
      root: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem'
      }
    },
    MuiGrid: {
      container: {
        maxWidth: 1600,
        margin: '0',
        padding: '0'
      }
    }
  },
  shape: {
    borderRadius: 0
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  fontWeight: 400,
  spacing: 2,
  alignItems: 'center',
  justify: 'center'
})

export default theme
