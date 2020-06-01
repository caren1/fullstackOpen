import React from 'react'

import Input from './Input'

const PersonForm = ({onSubmit, newName, handleNameChange, newPhoneNumber, handlePhoneChange}) => {
    return (
        <form onSubmit={onSubmit}>
        <Input text={'Name:'} onChange={handleNameChange} value={newName}/>
        <Input text={'Phone number:'} onChange={handlePhoneChange} value={newPhoneNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm 