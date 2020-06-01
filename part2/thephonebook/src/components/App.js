import React, { useState } from 'react'

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
    // console.log(event.target.value);
    setNewPhoneNumber(event.target.value);
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with:<input onChange={handleFilterChange}></input>
      </div>
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
              {/* {persons.map(person =>
                <li key={person.name}>
                     {person.name}, {person.number}
                </li>)
                } */}
                {personsToShow.map(person => 
                  <li key={person.name}>
                    {person.name}, {person.number}
                  </li>
                )}
          </ul>
      </div>
    </div>
  )
}

export default App