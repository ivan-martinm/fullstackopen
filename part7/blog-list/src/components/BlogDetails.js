import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const BlogDetails = () => {
  const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const id = useParams().id
  const navigate = useNavigate()

  const likeBlog = () => {
    dispatch(like(blog))
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      dispatch(remove(blog.id))
      navigate('/blogs')
    }
  }

  useEffect(() => {
    blogService.get(id).then((b) => setBlog(b))
  }, [])

  return !blog ? null : (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={likeBlog}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user && user.username === blog.user.username ? (
        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      ) : (
        ''
      )}
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
