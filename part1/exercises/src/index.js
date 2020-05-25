import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>Course: {props.course}</h1>
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
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
};


const Total = (props) => {
  let total = props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises;
  return (
    <div> 
      <p>Total number of exercises: {total}</p>
    </div>
  )
};

const App = () => {

  const course = 'Half stack application development';
  const parts = [
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

  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total exercises={parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));