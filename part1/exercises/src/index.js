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
      <Part part={props.parts.name} exercises={props.parts.exercises}/>
    </div>
  )
};


const Total = (props) => {
  // let total = 0;

  // for (let i = 0; i < props.exercises.length; i++){
  //   let exercise = props.exercises[i];
  //    total += exercise;
  // }
  
  return (
    <div> 
      <p>Total number of exercises: {props.exercises}</p>
    </div>
  )
};

const App = () => {

  const course = 'Half stack application development';

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content parts={part1}/>
      <Content parts={part2}/>
      <Content parts={part3}/>
      <Total exercises={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));