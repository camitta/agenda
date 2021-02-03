import React from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant'
import Hidden from '@material-ui/core/Hidden'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import CssBaseline from '@material-ui/core/CssBaseline'

const drawerWidth = 250
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    top: '20px',
    zIndex: '-3'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    marginLeft: '.25em'
  },
  list: {
    width: 250
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  fullList: {
    width: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: '.25em'
  }
}))

export default function SideMenu() {
  const classes = useStyles()
  const theme = useTheme()
  const categories = ['Notifications', 'Boards', 'Teams']
  const [open, setOpen] = React.useState(false)

  function toggleDrawer() {
    setOpen(!open)
  }

  const drawer = (
    <div>
      <List>
        {categories.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider />
        <List>
          <ListItem button key="Log Out">
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </List>
    </div>
  )
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* <Hidden smUp implementation='css'> */}
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={open}
          onClose={toggleDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            className={classes.closeMenuButton}
          >
            <CloseIcon />
          </IconButton>
          {drawer}
        </Drawer>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </div>
  )
}
