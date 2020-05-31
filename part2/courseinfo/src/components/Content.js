import React from 'react';

/* Components Import */
import Part from './Part';

const Content = ({ course }) => {
  console.log(course);

  const parts = course.parts;
  console.log(parts);

  return (
    <div>
      {parts.map(( part ) => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
};

  export default Content;