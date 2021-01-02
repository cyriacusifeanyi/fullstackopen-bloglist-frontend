import React from 'react'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>log in to application</h2>

            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={handleUsernameChange}
                    // onChange={({ target }) => setUsername(target.value)}
                    autoComplete="current-username"
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={handlePasswordChange}
                    // onChange={({ target }) => setPassword(target.value)}
                    autoComplete="current-password"
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm