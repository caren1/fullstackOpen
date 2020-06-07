import React, { useState, useEffect } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'

import personService from '../services/person'

const App = ({ props }) => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ showAll, setShowAll ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ messageType, setMessageType ] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(persons => {
      setPersons(persons)
    })
  }, [])
  
  let personsToShow = showAll ? persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase())) : persons

  const handleFilterChange = (event) => {
    setShowAll(event.target.value);
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }

  const addPerson = (event) => {
      event.preventDefault();
      const personObject = { name: newName, number: newPhoneNumber}
      const personNames = persons.map(person => person.name);

      if(!personNames.includes(personObject.name)){
        personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          handleMessage(`Successfully added ${newPerson.name}`, 'success')
        })
        .catch(error => {
          console.log(error);
          handleMessage(`Could not create: ${error}`, 'error')
        })

      } else {
        const decision = window.confirm(`${personObject.name} is already existing in the phone book. Do you want to replace the old number with a new one?`);
        if(decision){
          const personToUpdate = persons.find(person => person.name === personObject.name)
          const changedPerson = {...personToUpdate, number: personObject.number}

          personService
          .update(personToUpdate.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            handleMessage(`Successfully changed the ${returnedPerson.name}'s phone number`, 'success')
          })
          .catch(error => {
            console.log(error);
            handleMessage(`Information of ${changedPerson.name} has already been removed from server`, 'error')
          })
        }
      }
      setNewName('');
      setNewPhoneNumber('')
  }

  const removePerson = (id, name) => {
    const question = `Do you really want to delete the ${name} from the phonebook?`
    const decision = window.confirm(question);
    if(decision) {
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        handleMessage(`Successfully deleted ${name}`, 'success') 
      })
      .catch(error => {
        console.log(error);
        handleMessage(`Information of ${name} has already been removed from server`, 'error')
      })
    }
  }

  const handleMessage = (message, type) => {
    setMessage(message)
    setMessageType(type)

    setTimeout(() => {
      setMessage(null)
      setMessageType('')
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
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
      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App