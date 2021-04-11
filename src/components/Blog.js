import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Link, useParams
} from 'react-router-dom'
import { likeBlog, deleteBlog } from './../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ notifyWith, username }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return null
  }
  console.log(blog)
  const own = username === blog.user.username

  const handleLike = async () => {
    try {
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      }

      dispatch(likeBlog(likedBlog))
      notifyWith('you just liked: '.concat(blog.title))
    } catch (e) {
      notifyWith('Error: Unable to like blog post', 'error')
    }
  }

  // const handleRemove = async () => {
  //   try {
  //     const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)

  //     if (ok) {
  //       dispatch(deleteBlog(blog.id))
  //       notifyWith('blog post deleted succesfully:')
  //     }

  //   } catch (e) {
  //     notifyWith('Error: Unable to delete blog post', 'error')
  //   }
  // }

  if (!blog) {
    return null
  } else {
    return (
      <div id='blogInfo'>
        <h2>{blog.title} - {blog.author}</h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        {blog.likes} likes <button onClick={() => handleLike()}>like</button><br />
        {/* {own && <button onClick={() => handleRemove()}>delete</button>} */}
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </div>


    )
  }
}

Blog.propTypes = {
  username: PropTypes.string.isRequired,
  notifyWith: PropTypes.func.isRequired
}

export default Blog