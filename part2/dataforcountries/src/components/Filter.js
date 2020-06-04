import React from 'react';

 const Filter = ({onChange}) => {
    
        return (
            <div>
                {'Please provide country name:'} <input onChange={onChange}></input>
            </div>
        );
    }

export default Filter