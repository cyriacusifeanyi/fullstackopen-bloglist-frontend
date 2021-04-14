import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG':
    return action.data
  case 'DELETE_BLOG':
    return action.data
  case 'COMMENT_BLOG':
    return action.data
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update(blog)

    dispatch({
      type: 'LIKE_BLOG',
      data: await blogService.getAll()
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)

    dispatch({
      type: 'DELETE_BLOG',
      data: await blogService.getAll()
    })
  }
}

export const createComment = (id, comment) => {
  return async dispatch => {
    await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT_BLOG',
      data: await blogService.getAll()
    })
  }
}

export default blogReducer