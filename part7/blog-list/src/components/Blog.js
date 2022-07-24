import { Link } from 'react-router-dom'
import { Box, Paper } from '@mui/material'

const Blog = ({ blog }) => {
  const frameStyle = {
    marginBottom: 1, marginTop: 1
  }

  return (
    <div className="blog-content">
      <Box component="div" sx={frameStyle} className="fixedContent">
        <Paper elevation={3} sx={{padding: 2}}><Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}{' '}
        </Link></Paper>
      </Box>
    </div>
  )
}

export default Blog
