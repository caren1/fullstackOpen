import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>Course: {props.course.name}</h1>
    </div>
  )
};

const Part = (props) => {
  return (
    <div>
      <p>
        Part of the course: {props.part} <br/>
        Number of exercises: {props.exercises}
      </p>
    </div>
  )
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
    </div>
  )
};

const Total = (props) => {
  
  // let total = 0;
  // props.course.parts.forEach(element => {
  //   total += element.exercises;
  // });

  let total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises;

  return (
    <div> 
      <p>Total number of exercises: {total}</p>
    </div>
  )
};

const Course = (props) => {
  return(
    <div>
      <Header course={props.course} />
      <Content course={props.course}/>
      <Total course={props.course}/>
    </div>
  )
};

const App = () => {

  const course = {
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
  ]
};

  return (
    <>
      <Course course={course}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));