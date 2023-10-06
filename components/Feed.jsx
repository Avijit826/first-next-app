'use client'
import { useState, useEffect } from 'react'
import NoteCard from './NoteCard'

const NoteCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((note) => (
        <NoteCard key={note._id} note={note} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allNotes, setAllNotes] = useState([])

  // Search states
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  const fetchNotes = async () => {
    const response = await fetch('/api/note')
    const data = await response.json()

    setAllNotes(data)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <NoteCardList data={allNotes} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed
