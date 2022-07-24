import { useState } from 'react'
import { Button, TextField, Divider, Typography } from '@mui/material'

const NewBlogForm = ({ createNewBlog }) => {
  const useField = (name) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
      setValue(event.target.value)
    }
    const onReset = () => {
      setValue('')
    }
    return {
      id: `${name}-input`,
      variant: 'standard',
      label: name,
      value,
      onReset,
      onChange,
      name,
      type: 'text'
    }
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
      <Typography variant="h5">Create new</Typography>
      <form onSubmit={create}>
        <TextField {...title} />
        <div>
          <TextField {...author} />
        </div>
        <div>
          <TextField {...url} />
        </div>
        <Divider />
        <Button
          variant="contained"
          size="small"
          type="submit"
          id="create-button"
          sx={{ marginTop: 1, marginBottom: 1 }}
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default NewBlogForm
