import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usersService from '../services/users'
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)

  useEffect(() => {
    usersService.get(id).then((u) => setUser(u))
  }, [])

  return !user ? null : (
    <div>
      <Avatar>{user.name.substring(0,1)}</Avatar>
      <Typography variant='h6'>{user.name}</Typography>
      <Divider textAlign='left'><h3>Added blogs</h3></Divider>
      <List dense={true}>
        {user.blogs.map((blog) => {
          return (
            <ListItem key={blog.id}>
              <ListItemIcon>
                <AutoStoriesIcon />
              </ListItemIcon>
              <Link to={`/blogs/${blog.id}`}>
              <ListItemText primary={blog.title}></ListItemText>
              </Link>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default User
