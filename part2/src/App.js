// a simple phonebook
import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes.js'
import './index.css'

const Filter = ({findPerson,newFilter,handleFilterChange}) =>{
  return(
    <form onSubmit={findPerson}>
    <div>
      filter shown with:
      <input
      value = {newFilter}
      onChange = {handleFilterChange}
      />
    </div>
    </form>
    )
}

const PersonForm = ({addNote,newName,handleNoteChange,newNumber,handleNumberChange}) =>{
  return(
    <form onSubmit={addNote}>
    <div>
      name: 
      <input 
      value = {newName}
      onChange = {handleNoteChange}
      />
    </div>
    <div>
      number:
      <input
      value = {newNumber}
      onChange = {handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({ filter }) => {
  return filter && filter.length > 0 ? (
    <>
      {filter.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  ) : (
    <div>No persons found</div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notice'>
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [names, setNames] = useState([])
  const [filter, setFilter] = useState([])
  const [Message, setMessage] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    noteService.getAll()
    .then(initialNotes => {
        console.log('promise fulfilled')
        setPersons(initialNotes)
        setNames(initialNotes.reduce((accmulator, note) =>
        accmulator.concat(note.name), []))
        console.log('names')
        console.log(names)
        })
  }, [])


  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked')

    if (names.includes(newName)===true){
      alert(`${newName} is already added to phonebook`);
    }
    else{
    const nameObject ={
      name: newName,
      number: newNumber
    }

    noteService
      .create(nameObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNames(names.concat(returnedNote.name))
        setMessage(returnedNote.name)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewNumber('')
        setNewName('')
      })
    }
  }

  const findPerson = (event) => {
    event.preventDefault()
    setNewFilter('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setFilter(persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase())))
  }
    

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} />
      <Filter 
      findPerson={findPerson}
      newFilter={newFilter}
      handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
      addNote={addNote}
      newName={newName}
      handleNoteChange={handleNoteChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />

      <h3> ALL Numbers</h3>
      <Persons filter={persons}/>


      <h3> Filtered Numbers</h3>
      <Persons filter={filter}/>
  

    </div>
  )
}

export default App
