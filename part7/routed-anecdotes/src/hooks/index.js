import { useState } from 'react'

export const useField = (type) => {

    const [ value, setValue ] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const resetInput = () => {
        setValue('')
    }

    const inputFieldProperties = {
        type, value, onChange
    }

    return {
        inputFieldProperties,
        resetInput
    }
}
