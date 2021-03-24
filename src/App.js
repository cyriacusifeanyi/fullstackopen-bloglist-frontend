import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { notificationChange } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [notification, setNotification] = useState({ 'message': '', 'type': '' })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (message, messageType = 'success') => {
    dispatch(notificationChange({ 'message': message, 'messageType': messageType }, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('Wrong credentials', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch (e) {
      notifyWith('Unable to create new blog post')
    }
  }

  const handleLike = async (id) => {
    try {
      const blogToLike = blogs.find(b => b.id === id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
        user: blogToLike.user.id
      }
      await blogService.update(likedBlog)
      setBlogs(
        blogs.map(b => b.id === id ? {
          ...blogToLike,
          likes: blogToLike.likes + 1
        } : b)
      )
      notifyWith('you just liked: '.concat(blogToLike.title))
    } catch (e) {
      notifyWith('Error: Unable to like blog post', 'error')
    }
  }

  const handleRemove = async (id) => {
    try {
      const blogToRemove = blogs.find(b => b.id === id)
      const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author} ?`)
      if (ok) {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
      }
      notifyWith('blog post deleted succesfully:')
    } catch (e) {
      notifyWith('Error: Unable to delete blog post', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setUser(null)
      storage.logoutUser()
      notifyWith('Logout Successful')
    } catch (e) {
      notifyWith('logout unsuccessful - try again', 'error')
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <div>
      <Notification />

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        /> :
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable openButtonLabel='new note' closeButtonLabel='cancel' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          <div id='blogLists'>
            {blogs.sort(byLikes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
                own={user.username === blog.user.username}
              />
            )}
          </div>

        </div>
      }

    </div>
  )
}

export default App