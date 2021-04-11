import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

import loginService from './services/login'

import { notificationChange } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loadUser, loginUser, logoutUser } from './reducers/authentication/userReducer'

import { useDispatch, useSelector } from 'react-redux'

import {
  Switch,
  Route,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUser())
    dispatch(initializeUsers())
  }, [dispatch])
  const userAuth = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

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
      dispatch(loginUser(user))
      notifyWith(`${user.name} welcome back!`)
    } catch (exception) {
      notifyWith('Wrong credentials', 'error')
    }
  }

  const createNewBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))

      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (e) {
      notifyWith('Unable to create new blog post', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      dispatch(logoutUser())
      notifyWith('Logout Successful')
    } catch (e) {
      notifyWith('logout unsuccessful - try again', 'error')
    }
  }

  return (
    <div>
      <Notification />

      {userAuth === null ?
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
            {userAuth.name} logged-in <br />
            <button onClick={handleLogout}>logout</button>
          </p>

          <Switch>
            <Route path='/users/:id'>
              <User />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/blogs/:id'>
              <Blog notifyWith={notifyWith} username={userAuth.username} />
            </Route>
            <Route path='/'>
              <Togglable openButtonLabel='new note' closeButtonLabel='cancel' ref={blogFormRef}>
                <BlogForm createNewBlog={createNewBlog} />
              </Togglable>
              <Blogs />
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App