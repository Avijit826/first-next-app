'use client'

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const UserProfile = () => {
  const { data: session } = useSession()
  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/notes`)
    const data = await response.json()

    setNotes(data)
  }

  useEffect(() => {
    if (session?.user.id) fetchNotes()
  }, [])

  const handleEdit = () => {}
  const handleDelete = () => {}
  return (
    <Profile
      name='My'
      desc='Welcome to profile page'
      data={notes}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default UserProfile
