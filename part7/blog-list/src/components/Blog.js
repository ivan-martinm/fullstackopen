import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true)
  const user = useSelector(state => state.user)

  const frameStyle = {
    border: '2px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2,
  }

  const hideWhenCollapsed = { display: collapsed ? 'none' : '' }
  const toggleCollapsed = () => setCollapsed(!collapsed)

  const likeBlog = () => {
    dispatch(like(blog))
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      dispatch(remove(blog.id))
    }
  }

  return (
    <div className="blog-content">
      <div style={frameStyle} className="fixedContent">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleCollapsed}>{collapsed ? 'view' : 'hide'}</button>
        <div style={hideWhenCollapsed} className="toggleableContent">
          <div>{blog.url}</div>
          <div className="likes">
            likes {blog.likes}{' '}
            <button onClick={likeBlog} id="like-button">
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user && user.username === blog.user.username ? (
            <div>
              <button onClick={deleteBlog} id="delete-button">
                remove
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
