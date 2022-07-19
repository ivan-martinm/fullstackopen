import { connect } from 'react-redux'

const Notification = props => {
  const style = {
    display: props.notification ? '' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notifications
  }
}

export default connect(mapStateToProps)(Notification)