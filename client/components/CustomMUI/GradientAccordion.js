import Accordion from '@material-ui/core/Accordion'
import {withStyles} from '@material-ui/core/styles'
export const StyledAccordion = withStyles({
  root: {
    background: '#fff',
    '&:hover': {
      background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
      color: '#FFF'
    }
  }
})(Accordion)
