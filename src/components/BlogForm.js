import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleNewBlog}>
      <h2>Create new</h2>
      <label htmlFor='title'>Title</label>
      <input
        id='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      /> <br />
      <label htmlFor='text'>Author</label>
      <input
        id='text'
        type='text'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      /> <br />
      <label htmlFor='url'>URL</label>
      <input
        id='url'
        text='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      /> <br />
      <button id='submitNewNote' type='submit'>create</button>
    </form>
  )
}

export default BlogForm
