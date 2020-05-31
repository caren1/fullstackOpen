import React from 'react';

const Part = ({ part }) => {
    return (
      <div>
        <p>
          Part of the course: {part.name} <br/>
          Number of exercises: {part.exercises}
        </p>
      </div>
    )
  };

  export default Part;