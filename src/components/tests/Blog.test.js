import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './../Blog'

test('renders content', () => {
  const blog = {
    title: 'Open source software',
    author: 'Github',
    url: 'oss.org',
    likes: '2',
    id: '5ff332719d6e132548873b1d',
    user: { name: 'Gladness' }
  }

  const component = render(
    <Blog blog={blog} />
  )

  // expect(component.container).toHaveTextContent(
  //   blog.title.concat(' - ', blog.author)
  // )

  const div = component.container.querySelector('.blog')
  const togglableContent = component.container.querySelector('.togglableContent')

  expect(div).toHaveTextContent(blog.title.concat(' - ', blog.author))
  expect(div).toBeVisible()
  expect(togglableContent).not.toBeVisible()
  console.log(prettyDOM(div))
})