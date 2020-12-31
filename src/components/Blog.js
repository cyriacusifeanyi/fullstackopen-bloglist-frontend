import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <Togglable openButtonLabel='view' closeButtonLabel='hide'>
        {blog.url}<br />
        likes {blog.likes}<button >like</button><br />
        {blog.user.name}
      </Togglable>
    </div>

  )
}

export default Blog