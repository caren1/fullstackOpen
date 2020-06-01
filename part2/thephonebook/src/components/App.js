import React, { useState } from 'react'

const App = ({ props }) => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')

  const handleNameChange = (event) => {
      console.log(event.target.value);
      setNewName(event.target.value);
  }

  const handleNewPerson = (event) => {
      event.preventDefault();
      const personObject = {
          name: newName,
          phone: newPhoneNumber
      }

      const personNames = persons.map(person => person.name);
      if(!personNames.includes(personObject.name)){
        setPersons(persons.concat(personObject));
        setNewName('');
      } else {
        alert(`${personObject.name} is already existing in the phone book.`)
      }
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewPhoneNumber(event.target.value);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          phone number: <input onChange={handlePhoneChange} value={newPhoneNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
          <ul>
              {persons.map(person =>
                <li key={person.name}>
                     {person.name}, {person.phone}
                </li>)
                }
          </ul>
      </div>
    </div>
  )
}

export default App