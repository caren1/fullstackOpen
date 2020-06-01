import React, { useState } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = ({ props }) => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ showAll, setShowAll ] = useState('')

  let personsToShow = showAll ? persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase())) : persons

  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setShowAll(event.target.value);
  }

  const handleNameChange = (event) => {
      // console.log(event.target.value);
      setNewName(event.target.value);
  }

  const addPerson = (event) => {
      event.preventDefault();
      const personObject = {
          name: newName,
          number: newPhoneNumber
      }

      const personNames = persons.map(person => person.name);
      if(!personNames.includes(personObject.name)){
        setPersons(persons.concat(personObject));
        setNewName('');
        setNewPhoneNumber('')
      } else {
        alert(`${personObject.name} is already existing in the phone book.`)
      }
  }

  const handlePhoneChange = (event) => {
    // console.log(event.target.value);
    setNewPhoneNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterChange} value={showAll} />

      <h3>Add a new</h3>

      <PersonForm 
      onSubmit={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newPhoneNumber={newPhoneNumber}
      handlePhoneChange={handlePhoneChange}
      />

      <h3>Persons:</h3>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App