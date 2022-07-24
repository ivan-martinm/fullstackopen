import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@mui/material'

const Users = () => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const tableStyle = {
    border: '0px'
  }

  return (
    <div>
      <Typography variant="h5">Users</Typography>
      <Table sx={{ maxWidth: 650 }} style={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>
              <strong>Blogs created</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {<Link to={`/users/${user.id.toString()}`}>{user.name}</Link>}
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
