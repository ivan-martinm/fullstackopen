import { Link } from 'react-router-dom'
import { Box } from '@mui/material'

const Blog = ({ blog }) => {
  const frameStyle = {
    maxWidth: 600,
    border: '2px dotted',
    marginTop: 1,
    marginBottom: 1,
    padding: 1,
    paddingLeft: 2
  }

  return (
    <div className="blog-content">
      <Box
        component="div"
        sx={frameStyle}
        className="fixedContent"
      >
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}{' '}
        </Link>
      </Box>
    </div>
  )
}

export default Blog
