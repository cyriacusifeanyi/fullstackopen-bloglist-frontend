import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        })
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <h2>Create new</h2>
            <label htmlFor="newBlogTitle">Title</label>
            <input
                id="newBlogTitle"
                value={newBlogTitle}
                onChange={({ target }) => setNewBlogTitle(target.value)}
            /> <br />
            <label htmlFor="newBlogAuthor">Author</label>
            <input
                id="newBlogAuthor"
                type="text"
                value={newBlogAuthor}
                onChange={({ target }) => setNewBlogAuthor(target.value)}
            /> <br />
            <label htmlFor="newBlogUrl">URL</label>
            <input
                id="newBlogUrl"
                text="url"
                value={newBlogUrl}
                onChange={({ target }) => setNewBlogUrl(target.value)}
            /> <br />
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm
