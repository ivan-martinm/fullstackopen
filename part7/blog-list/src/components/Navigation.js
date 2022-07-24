import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'

const Navigation = ({ handleLogout }) => {
  const menuStyle = {
    backgroundColor: 'lightblue',
    padding: '5px'
  }

  const menuItemStyle = {
    padding: '5px'
  }

  const user = useSelector((state) => state.user)

  return (
    <AppBar position="static" style={menuStyle}>
      <Toolbar>
        <Button component={Link} style={menuItemStyle} to="">
          blogs
        </Button>
        <Button component={Link} style={menuItemStyle} to="/users">
          users
        </Button>
        {user ? (
          <span style={menuItemStyle}>
            {user.name}
            <Typography component="span"> logged in </Typography>
            <Button onClick={handleLogout}>log out</Button>
          </span>
        ) : (
          ''
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
