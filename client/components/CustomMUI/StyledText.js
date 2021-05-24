import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
export const StyledText = withStyles({
  root: {
    h5: {
      fontStretch: 'expanded'
    }
  }
})(Typography)
