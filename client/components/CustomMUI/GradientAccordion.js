import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import {withStyles} from '@material-ui/core/styles'
export const StyledAccordion = withStyles({
  root: {
    background: '#fff',
    '&:hover': {
      background: 'linear-gradient(45deg, #9954c8 0%, #fcb045 100%)',
      color: '#FFF'
    }
  }
})(AccordionSummary)
