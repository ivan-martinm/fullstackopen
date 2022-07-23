import { useState } from 'react'

const NewBlogForm = ({ createNewBlog }) => {

  const useField = (name) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
      setValue(event.target.value)
    }
    const onReset = () => {
      setValue('')
    }
    return { id: `${name}-input`, value, onReset, onChange, name, type: 'text' }
  }

  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const create = (event) => {
    event.preventDefault()
    const newBlog = { title: title.value, author: author.value, url: url.value }
    createNewBlog(newBlog)
    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <div className="form">
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm
