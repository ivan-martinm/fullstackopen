import { useState } from 'react'

const NewBlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const create = event => {
    event.preventDefault()
    let newBlog = { title, author, url }
    setTitle('')
    setAuthor('')
    setUrl('')
    createNewBlog(newBlog)
  }

  return (
    <div className='form'>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>title:
          <input type="text" name="title"
            value={title} id='title-input'
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>author:
          <input type="text" name="author"
            value={author} id='author-input'
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>url:
          <input type="text" name="url"
            value={url} id='url-input'
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit" id='create-button'>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
