import React, { useState, useEffect } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

import personService from '../services/person'

const App = ({ props }) => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ showAll, setShowAll ] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(persons => {
      setPersons(persons)
    })
  })
  
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
        personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          console.log('successfully added a person to Database.')
          setNewName('');
          setNewPhoneNumber('')
        })
        .catch(error => {
          console.log('Something went wrong:' + error);
        })
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