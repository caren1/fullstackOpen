import React from 'react'
import { connect } from 'react-redux'
import { handleFilterChange } from '../reducers/filterReducer'

const Filter = (props) => {

const handleChange = (event) => {
    props.handleFilterChange(event.target.value)
}

    return (
        <div>
            Filter anegdotes: <input onChange={handleChange}></input>
        </div>
    )
}

export default connect( null, { handleFilterChange })(Filter)