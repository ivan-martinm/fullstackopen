import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const message = useSelector((state) => state.notification)
  if (!message) {
    return null
  }

  const severity = message.isError ? 'error' : 'success'
  return <Alert severity={severity}>{message.text}</Alert>
}

export default Notification
