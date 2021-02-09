import React from 'react'
import DeleteUser from './DeleteUser'

const UserAvatar = props => {
  const {users, taskId, boardId} = props || []

  return (
    <>
      {users.length
        ? users.map(user => (
            <DeleteUser
              key={user.id}
              userId={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              boardId={boardId}
              taskId={taskId}
            />
          ))
        : null}
    </>
  )
}

export default UserAvatar
