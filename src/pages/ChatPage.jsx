// BY GOD'S GRACE ALONE

import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

export default function ChatPage() {
  const {logout} = useAuthStore()
  return (
    <div className='z-50'>
      ChatPage
      <button onClick={logout}>Logout</button>
    </div>
  )
}
