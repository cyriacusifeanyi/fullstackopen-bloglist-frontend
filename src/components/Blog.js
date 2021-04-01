import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from './../reducers/blogReducer'
import blogService from './../services/blogs'

const Blog = ({ blog, own, notifyWith }) => {
  const dispatch = useDispatch()

  const handleLike = async () => {
    try {
      // const blogToLike = blogs.find(b => b.id === id)

      const likedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      }

      dispatch(likeBlog(likedBlog))
      await blogService.update(likedBlog)
      notifyWith('you just liked: '.concat(blog.title))
    } catch (e) {
      notifyWith('Error: Unable to like blog post', 'error')
    }
  }

  const handleRemove = async () => {
    try {
      // const blogToRemove = blogs.find(b => b.id === id)
      const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)

      if (ok) {
        dispatch(deleteBlog(blog.id))
        notifyWith('blog post deleted succesfully:')
      }

    } catch (e) {
      notifyWith('Error: Unable to delete blog post', 'error')
    }
  }

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
        likes {blog.likes}<button onClick={() => handleLike()}>like</button><br />
        {blog.user.name}<br />
        {own && <button onClick={() => handleRemove()}>delete</button>}
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
  notifyWith: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog