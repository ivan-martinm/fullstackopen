import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import { Link } from 'react-router-dom'

const Navigation = ({ handleLogout }) => {
  const menuStyle = {
    backgroundColor: 'lightgrey',
    padding: '5px'
  }

  const menuItemStyle = {
    padding: '5px'
  }

  const user = useSelector((state) => state.user)

  return (
    <div style={menuStyle}>
      <Link style={menuItemStyle} to="">
        blogs
      </Link>
      <Link style={menuItemStyle} to="/users">
        users
      </Link>
      {user ? (
        <span style={menuItemStyle}>
          {user.name} logged in <button onClick={handleLogout}>log out</button>
        </span>
      ) : (
        ''
      )}
    </div>
  )
}

export default Navigation
