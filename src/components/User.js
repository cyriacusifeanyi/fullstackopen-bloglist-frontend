import React from 'react'
import { useSelector } from 'react-redux'

import {
  Link, useParams
} from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <li className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </li >
  )
}

const User = () => {
  const id = useParams().id

  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === id)

  const blogs = user['blogs']
  const name = user['name']

  if (!user) {
    return null
  } else {
    return (
      <div id='userInfo'>
        <h2>{name}</h2>
      added blogs

        <ul className='userBlogList'>
          {blogs.map(blog => {
            return (
              < Blog
                key={blog.id}
                blog={blog}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default User
