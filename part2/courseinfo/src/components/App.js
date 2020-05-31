import React from 'react';

/* Components Import */
import Course from './Course';

const App = ({ courses }) => {
    return (
      <>
        {courses.map((course) => 
        <Course key={course.id} course={course} />
        )}
      </>
    )
  }
  
 export default App

 