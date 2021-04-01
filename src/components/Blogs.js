import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Blogs = ({ username, notifyWith }) => {

  const blogs = useSelector(state => state.blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div id='blogLists'>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          own={username === blog.user.username}
          notifyWith={notifyWith}
        />
      )}
    </div>
  )
}

Blogs.propTypes = {
  username: PropTypes.string.isRequired,
  notifyWith: PropTypes.func.isRequired
}

export default Blogs
