import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const frameStyle = {
    border: '2px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }

  return (
    <div className="blog-content">
      <div style={frameStyle} className="fixedContent">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}{' '}</Link>
      </div>
    </div>
  )
}

export default Blog
