import React from 'react'
import { useDispatch } from 'react-redux'
import { handleFilterChange } from '../reducers/filterReducer'

const Filter = () => {

const dispatch = useDispatch()
const handleChange = (event) => {
    dispatch(handleFilterChange(event.target.value))
}

    return (
        <div>
            Filter anegdotes: <input onChange={handleChange}></input>
        </div>
    )
}

export default Filter