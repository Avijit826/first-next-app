'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'
import { useState, useEffect } from 'react'

const UpdatePost = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const noteId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false)
  const [note, setNote] = useState({
    content: '',
    tag: '',
  })

  const getNoteData = async () => {
    const response = await fetch(`/api/note/${noteId}`)
    const data = await response.json()

    setNote({
      content: data.content,
      tag: data.tag,
    })
  }

  useEffect(() => {
    if (noteId) getNoteData()
  }, [noteId])

  const createPost = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch(`/api/note/${noteId}`, {
        method: 'PATCH',
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

export default UpdatePost
