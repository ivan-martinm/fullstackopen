import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { like, remove, comment } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'

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
    const newComment = { comment: commentValue }
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
    <Card sx={{ backgroundColor: 'lightblue' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {blog.title.substring(0, 1)}
          </Avatar>
        }
        title={<strong>{`${blog.title} ${blog.author}`}</strong>}
        subheader={<a href={blog.url}>{blog.url}</a>}
      />
      <CardContent><em>Added by {blog.user.name}</em></CardContent>
      <CardActions>
        <IconButton aria-label="Like blog" onClick={likeBlog}>
          <FavoriteIcon />
        </IconButton>
        {blog.likes} likes
      </CardActions>
      {user && user.username === blog.user.username ? (
        <div style={{ margin: 5 }}>
          <Button variant="outlined" onClick={deleteBlog}>
            remove
          </Button>
        </div>
      ) : (
        ''
      )}

      <div style={{ padding: 10 }}>
        <Typography variant="h6">Comments</Typography>
        <TextField
          variant="filled"
          label="Your review"
          multiline
          size="small"
          fullWidth={true}
          value={commentValue}
          onChange={({ target }) => handleComment(target)}
          type="text"
        />
        <Button variant="outlined" size="small" onClick={commentBlog}>
          add comment
        </Button>
      </div>

      <List sx={{ width: '100%'}}>
        {blog.comments.map((comment) => (
          <ListItem key={comment._id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={comment.comment}></ListItemText>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default BlogDetails
