import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form id='loginForm' onSubmit={handleSubmit}>
      <h2>log in to application</h2>

      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='username'
          onChange={handleUsernameChange}
          // onChange={({ target }) => setUsername(target.value)}
          autoComplete='current-username'
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='password'
          onChange={handlePasswordChange}
          // onChange={({ target }) => setPassword(target.value)}
          autoComplete='current-password'
        />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm