/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './Navbar'
export {default as UserHome} from './UserHome'
export {Login, Signup} from './AuthForm'
export {default as SingleBoard} from './SingleBoard'
export {default as List} from './List'
export {default as Task} from './Task'
export {default as SideMenu} from './SideMenu'
export {default as Checklist} from './Checklist'
export {default as CreateBoard} from './CreateBoard'
export {TaskForm} from './TaskForm'
export {default as AddUserToTask} from './AddUserToTask'
export {default as UserAvatar} from './UserAvatar'
export {default as Chips} from './Chips'
