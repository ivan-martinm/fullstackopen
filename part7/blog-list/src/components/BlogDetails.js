import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { like, remove, comment } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const BlogDetails = () => {
  const [blog, setBlog] = useState(null)
  const [commentValue, setCommentValue] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const id = useParams().id
  const navigate = useNavigate()

  const handleComment = (target) => {
    setCommentValue(target.value)
  }

  const likeBlog = () => {
    dispatch(like(blog))
  }

  const commentBlog = () => {
    const newComment = {comment: commentValue }
    dispatch(comment(blog.id, newComment))
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      dispatch(remove(blog.id))
      navigate('/blogs')
    }
  }

  useEffect(() => {
    blogService.get(id).then((b) => setBlog(b))
  }, [blog])

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
      <div>
        <input
          value={commentValue}
          onChange={({ target }) => handleComment(target)}
          type="text"
        />
        <button onClick={commentBlog}>add comment</button>
      </div>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
