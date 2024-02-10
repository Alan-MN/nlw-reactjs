import { useState } from 'react'
import logo from './assets/logo-nlw-home.svg'
import { NewNote } from './components/new_note_card'
import { NoteCard } from './components/note_card'


interface Note{
  id: string,
  date: Date,
  content: string
}

export function App() {
  const [notes, setNotes] = useState<Note[]>([])

  function onNoteCreation(content: string){
    const new_note = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    setNotes([new_note, ...notes])
  }

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>

      {/*logo*/}
      <img src={logo} alt='NLW Expert'/>

      {/*input*/}
      <form className='w-full'>
        <input 
          type='text' 
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500'/>
      </form>
      
      {/*Outline de divisao*/}
      <div className='h-px bg-slate-700'/>

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>

        <NewNote onNoteCreation= {onNoteCreation}/>

        {notes.map(
          note => {
            return <NoteCard  key={note.id}   note={note}/>
          }
        )}
      </div>
    </div>
  )
}
