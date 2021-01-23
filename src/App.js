import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs(initialBlogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessageType('success')
        setNotificationMessage('a new blog: '.concat(blogObject.title, ' by ', blogObject.author, ' added.'))
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(() => {
        setMessageType('error')
        setNotificationMessage('Unable to create new blog post')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = async (id, blog) => {
    let permission = window.confirm('remove blog', blog.title, ' by ', blog.author)

    if (permission) {

      try {
        await blogService
          .remove(id)
        setMessageType('success')
        setNotificationMessage('blog deleted succesfully: ')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

      } catch (e) {
        setMessageType('error')
        setNotificationMessage('Unable to delete blog post')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }

    }

  }

  const likeBlog = async (id, blog) => {
    try {

      await blogService
        .update(id, { 'likes': ++blog.likes })
      setMessageType('success')
      setNotificationMessage('you just liked: '.concat(blog.title))
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (e) {
      --blog.likes
      setMessageType('error')
      setNotificationMessage('Unable to like blog post')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      setMessageType('success')
      setNotificationMessage('Login Successful')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageType('error')
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out /"', username, '/"')
    try {
      window.localStorage.removeItem('loggedBlogappUser')

      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageType('error')
      setNotificationMessage('Unable to Logout')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const noteFormRef = useRef()


  return (
    <div>
      <Notification notificationMessage={notificationMessage || ''} messageType={messageType || ''} />

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
          <Togglable openButtonLabel='new note' closeButtonLabel='cancel' ref={noteFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <div id='blogLists'>
            {blogs
              .sort((a, b) => (a.likes < b.likes ? 1 : -1))
              .map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
              )}
          </div>

        </div>
      }

    </div>
  )
}

export default App