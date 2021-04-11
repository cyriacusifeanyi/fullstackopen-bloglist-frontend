import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => (
  <tr className='user'>
    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
    <td>{user.blogs.length}</td>
  </tr >
)

const Users = () => {
  const users = useSelector(state => state.users)
  const byBlogsLength = (b1, b2) => b2.blogs.length - b1.blogs.length

  return (
    <div id='usersSummary'>
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
