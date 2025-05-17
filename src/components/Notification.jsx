import '../css/Notificaiton.css'
import { useState } from 'react'

function Notification() {
    const [show, setShow] = useState(true)
    const handleClose = () => {
        setShow(false)
    }
  return (
    <div className={`notification ${show ? '' : 'disabled'}`}>
        <p>This Web appication is under production!
        </p>
      <a onClick={handleClose}>&times;</a>
    </div>
  )
}

export default Notification
