import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (!message) {
    return null
  }
  const style = {
    color: message.isError ? 'red' : 'green',
    fontSize: 20,
    border: '2px solid',
    borderRadius: '7px',
    padding: '7px',
    borderColor: message.isError ? 'red' : 'green',
    backgroundColor: 'lightgrey',
  }
  return (
    <div className="notification" style={style}>
      {message.text}
    </div>
  )
}

export default Notification
