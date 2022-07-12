import { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [currentBlog, setCurrentBlog] = useState(blog)

  const frameStyle = {
    border: '2px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }

  const hideWhenCollapsed = { display: collapsed ? 'none' : '' }
  const toggleCollapsed = () => setCollapsed(!collapsed)

  const like = async () => {
    blog = await likeBlog(currentBlog)
    setCurrentBlog(blog)
  }

  return (
    < div style={frameStyle} >
      {currentBlog.title} {currentBlog.author} <button onClick={toggleCollapsed}>{collapsed ? 'view' : 'hide'}</button>
      <div style={hideWhenCollapsed}>
        <div>{currentBlog.url}</div>
        <div>likes {currentBlog.likes} <button onClick={like}>like</button></div>
        <div>{currentBlog.user.name}</div>
      </div>
    </div>
  )
}


export default Blog