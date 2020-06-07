import React from 'react'

// const error = {
//     color: 'red',
//     background: 'lightgrey',
//     fontSize: 20,
//     borderStyle: 'solid',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10
// }

// const success = {
//     color: 'green',
//     background: 'lightgrey',
//     fontSize: 20,
//     borderStyle: 'solid',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10
// }


const Notification = ({ message, type }) => {
    if(message === null){
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
    
}

export default Notification