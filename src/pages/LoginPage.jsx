// ALL THANKS AND GLORY TO THE AND my ONLY GOD AND LORD JESUS CHRIST ALONE

import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
    const {authUser, isLoading, login} = useAuthStore();
  return (
    <div>LoginPage</div>
  )
}
