import React from 'react'

const Button = ({onClick, text, country}) => {

    return(
    <button onClick={onClick}>{text}</button>
    )
}
export default Button