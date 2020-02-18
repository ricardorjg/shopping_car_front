import React from 'react'

const Notification = ({ msg, classStyle }) => {
    if (!msg) {
        return null
    }
    return <div className={classStyle}>{msg}</div>
}

export default Notification
