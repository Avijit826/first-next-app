import { connectToDB } from '@utils/db'
import Note from '@models/note'

// GET -> Read individual note
export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const note = await Note.findById(params.id).populate('creator')

    if (!note) return new Response('Note not found', { status: 404 })

    return new Response(JSON.stringify(note), { status: 200 })
  } catch (error) {
    return new Response('Fail to fetch note', { status: 500 })
  }
}

// PATCH -> Update individual note
export const PATCH = async (req, { params }) => {
  const { content, tag } = await req.json()
  try {
    await connectToDB()
    const existingNote = await Note.findById(params.id)

    if (!existingNote) return new Response('Note not found', { status: 404 })

    existingNote.content = content
    existingNote.tag = tag

    return new Response(JSON.stringify(existingNote), { status: 200 })
  } catch (error) {
    return new Response('Fail to update the note', { status: 500 })
  }
}
// DELETE -> Delete individual note
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()
    await Note.findByIdAndRemove(params.id)
    return new Response('Note has been deleted', { status: 200 })
  } catch (error) {
    return new Response('Fail to delete the note', { status: 500 })
  }
}
