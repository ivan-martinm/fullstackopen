import Blog from '../components/Blog'
import NewBlogForm from '../components/NewBlogForm'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('testing <Blog /> component', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={{
          title: 'This is the title',
          author: 'Anonymous',
          url: 'http://localhost',
          likes: 13,
          user: {
            username: 'user01',
            name: 'User 01',
          },
        }}
      />
    ).container
  })

  test('Blog renders title and author by default but does not render url and likes', () => {
    let div = container.querySelector('.fixedContent')
    expect(div).toHaveTextContent('This is the title Anonymous')

    div = container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('Url and likes are rendered after show button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.toggleableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})

describe('testing <Blog /> component', () => {
  test('Event handler received as props by the component is called twice', async () => {
    const incrementLikes = jest.fn()

    const blog = (
      <Blog
        blog={{
          title: 'This is the title',
          author: 'Anonymous',
          url: 'http://localhost',
          likes: 13,
          user: {
            username: 'user01',
            name: 'User 01',
          },
        }}
        likeBlog={incrementLikes}
      />
    )

    render(blog)

    const user = userEvent.setup()

    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(incrementLikes.mock.calls).toHaveLength(2)
  })
})

describe('testing <NewBlogForm /> component', () => {
  test('the form calls the event handler received as props with the right details', async () => {
    const createNewBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<NewBlogForm createNewBlog={createNewBlog} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const button = screen.getByText('create')

    await user.type(titleInput, 'Blog title')
    await user.type(authorInput, 'Blog author')
    await user.type(urlInput, 'Blog url')

    await user.click(button)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe('Blog title')
    expect(createNewBlog.mock.calls[0][0].author).toBe('Blog author')
    expect(createNewBlog.mock.calls[0][0].url).toBe('Blog url')
  })
})
