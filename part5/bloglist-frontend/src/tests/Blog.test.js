import Blog from '../components/Blog'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('testing Blog component', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={
        {
          title: 'This is the title',
          author: 'Anonymous',
          url: 'http://localhost',
          likes: 13,
          user: {
            username: 'user01',
            name: 'User 01',
          }
        }
      } />).container
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