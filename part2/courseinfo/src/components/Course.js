import React from 'react';

const Header = ({ course }) => {
  return (
    <div>
      <h1>Course: {course.name}</h1>
    </div>
  )
};

const Content = ({ course }) => {
  
  const parts = course.parts;

  return (
    <div>
      {parts.map(( part ) => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
};

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

const Total = ({ course }) => {
  const parts = course.parts;

  const exercises = parts.map(el => el.exercises);

  // const reducer = (accumulator, currentValue) => accumulator + currentValue;
  // let total = exercises.reduce(reducer);

  let total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue)

  return (
      <div>
          <p><em>Total sum of exercises in the course is: {total}</em></p>
      </div>
  )
}

const Course = ({ course }) => {
    return(
      <div>
        <Header course={course} />
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  };

  export default Course;