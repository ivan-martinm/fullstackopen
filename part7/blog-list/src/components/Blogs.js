import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create, initializeBlogs } from '../reducers/blogReducer'
import Toggleable from './Toggleable'
import NewBlogForm from './NewBlogForm'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const sortBlogsByLikes = (blogs) => {
    const sortedList = [...blogs]
    sortedList.sort((a, b) => a.likes - b.likes)
    return sortedList.reverse()
  }

  const createNewBlog = (newBlog) => {
    dispatch(create(newBlog)).then((result) => {
      if (result) {
        blogFormRef.current.toggleVisibility()
      }
    })
  }

  return (
    <div>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm createNewBlog={createNewBlog} />
      </Toggleable>
        {sortBlogsByLikes(blogs).map((blog) => (
            <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default Blogs
