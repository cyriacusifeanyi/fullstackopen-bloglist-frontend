import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from './../reducers/userReducer'


const User = ({ user }) => {

  return (
    <tr className='user'>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)
  const byBlogsLength = (b1, b2) => b2.blogs.length - b1.blogs.length

  return (
    <div id='userLists'>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.sort(byBlogsLength).map(user =>
            <User
              key={user.id}
              user={user}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
