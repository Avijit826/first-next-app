import { connectToDB } from '@utils/db'
import Note from '@models/note'
export const POST = async (req, res) => {
  const { userId, content, tag } = await req.json()

  try {
    await connectToDB()
    const newNote = new Note({
      creator: userId,
      content,
      tag,
    })
    await newNote.save()
    return new Response(JSON.stringify(newNote), { status: 201 })
  } catch (error) {
    return new Response('Falied to create new note', { status: 500 })
  }
}
