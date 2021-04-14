import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  Link, useParams
} from 'react-router-dom'
import { likeBlog, createComment } from './../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ notifyWith }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

  const [comment, setComment] = useState('')

  const addComment = () => {
    // event.preventDefault()

    try {
      dispatch(createComment(id, comment))
      // console.log('addComment: ', comment)
      notifyWith(`a new comment for '${blog.title}' just got added!`)
    } catch (e) {
      notifyWith('Unable to add new comment to blog', 'error')
    }
    setComment('')
  }

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

        <h3>comments</h3>
        <input
          id='commentBox'
          value={comment}
          onChange={({ target }) => {
            // console.log('commenting:', target.value)
            setComment(target.value)
          }}
        />

        <button onClick={() => {
          // console.log('comment value: ', comment)
          addComment()
        }}>add comment</button><br />

        {blog['comments'].map(comment =>
          <li key={comment}>{comment}</li>
        )}

      </div>
    )
  }
}

Blog.propTypes = {
  // username: PropTypes.string.isRequired,
  notifyWith: PropTypes.func.isRequired
}

export default Blog