import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blog = ({ blog, handleLike, handleRemove, own }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} - {blog.author}
      <Togglable openButtonLabel='view' closeButtonLabel='hide'>
        {blog.url}<br />
        likes {blog.likes}<button onClick={() => handleLike(blog.id)}>like</button><br />
        {blog.user.name}<br />
        {own && <button onClick={() => handleRemove(blog.id)}>delete</button>}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog