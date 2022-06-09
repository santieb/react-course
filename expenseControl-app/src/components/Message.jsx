import React from 'react'

const Message = ({ message, type }) => {
  return (
    <div className={`alerta ${type}`}>
      {message}
    </div>
  )
}

export default Message