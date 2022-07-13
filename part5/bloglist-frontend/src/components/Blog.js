import { useState } from 'react'

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  const [collapsed, setCollapsed] = useState(true)

  const frameStyle = {
    border: '2px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }

  const hideWhenCollapsed = { display: collapsed ? 'none' : '' }
  const toggleCollapsed = () => setCollapsed(!collapsed)

  const like = () => {
    likeBlog(blog)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    < div style={frameStyle} >
      {blog.title} {blog.author} <button onClick={toggleCollapsed}>{collapsed ? 'view' : 'hide'}</button>
      <div style={hideWhenCollapsed}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={like}>like</button></div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username
          ?
          <div>
            <button onClick={remove}>remove</button>
          </div>
          : ''
        }
      </div>
    </div>
  )
}


export default Blog