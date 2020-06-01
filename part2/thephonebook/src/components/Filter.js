import React from 'react'
import Input from './Input'

const Filter = ( {onChange, value} ) => {

    return (
        <div>
             <Input text={'Filter shown with:'} onChange={onChange} value={value}/>
        </div>
    )
}

export default Filter