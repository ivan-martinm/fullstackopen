import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usersService from '../services/users'

const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)

  useEffect(() => {
    usersService.get(id).then((u) => setUser(u))
  }, [])

  return !user ? null : (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
