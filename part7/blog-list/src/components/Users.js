import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

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
      <h2>Users</h2>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
