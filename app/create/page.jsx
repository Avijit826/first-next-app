'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'
import { useState } from 'react'

const CreatePost = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [note, setNote] = useState({
    content: '',
    tag: '',
  })

  const createPost = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/note/new', {
        method: 'POST',
        body: JSON.stringify({
          content: note.content,
          userId: session?.user.id,
          tag: note.tag,
        }),
      })
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Create'
      note={note}
      setNote={setNote}
      submitting={submitting}
      handleSubmit={createPost}
    />
  )
}

export default CreatePost
