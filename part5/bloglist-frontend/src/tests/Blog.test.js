import Blog from '../components/Blog'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

test('Blog renders title and author by default but does not render url and likes', () => {
  const blog = {
    title: 'This is the title',
    author: 'Anonymous',
    url: 'http://localhost',
    likes: 13,
    user: {
      username: 'user01',
      name: 'User 01',
    }
  }

  const { container } = render(<Blog blog={blog} />)

  let div = container.querySelector('.fixedContent')
  expect(div).toHaveTextContent('This is the title Anonymous')

  div = container.querySelector('.toggleableContent')
  expect(div).toHaveStyle('display: none')
})
